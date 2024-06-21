# CoWorkBooker

## Description:

CoWorkBooker is a web application designed to manage room reservations for co-working spaces. It provides a streamlined booking process for both administrators and users, ensuring efficient management of meeting rooms and time slots.

### Admin Actions:

Administrators have comprehensive control over the co-working space inventory:

- Create, update, and delete rooms with details such as name, number, floor, capacity, price per slot, and amenities.
- Manage time slots for each room, setting dates, start times, and end times to ensure availability.

### User Interactions:

Users can effortlessly book rooms for their meetings:

- Select available time slots on desired dates.
- Input booking details including room selection and preferred slots.
- Automatically calculate total costs based on slots chosen and prices per slot.
- Receive real-time updates on room and slot availability to avoid conflicts.

### Validation and Error Handling:

CoWorkBooker implements robust mechanisms for seamless user experiences:

- Informative error messages for booking conflicts and validation errors.
- Ensure smooth interactions and accurate data handling.

## Features

- **User Management**: Enable users to sign up, log in, and manage their accounts securely.
- **Room Management**: Allow admins to add, update, delete, and view co-working rooms.
- **Slot Management**: Enable admins to create, update, and delete time slots for room bookings.
- **Booking Management**: Facilitate users in creating, viewing, and canceling bookings.
- **Availability Check**: Provide endpoints to check slot availability for specific dates.
- **Error Handling**: Implement robust error handling middleware for consistent and informative responses.
- **Authentication & Authorization**: Secure API endpoints using JWT-based authentication and role-based authorization.
- **Data Validation**: Ensure data integrity and consistency with Zod for input validation.

## Technology Stack

- **TypeScript**: Provides type safety and enhanced code quality.
- **Express.js**: Fast, minimalist web framework for Node.js, ideal for building RESTful APIs.
- **Mongoose**: Elegant MongoDB object modeling for Node.js, simplifying interactions with MongoDB.
- **JWT (JSON Web Tokens)**: Securely transfer claims between parties for authentication purposes.
- **Zod**: TypeScript-first schema declaration and validation library, ensuring data consistency and preventing runtime errors.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mdsejan/co-work-booker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CoWorkBooker
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory.
2. Add the following environment variables to the `.env` file:

   ```plaintext
   PORT=5000
   DATABASE_URL=<mongodb-uri>
   BCRYPT_SALT_ROUNDS=<salt>
   JWT_SECRET=<jwt-secret>
   ```

### Running the Application

Start the server:

```bash
npm run start:dev
```

The server will start running at `http://localhost:5000`.

## API Endpoints

1. **User Sign Up**

   - **Route:** `{domain}/api/auth/signup` `POST`

2. **User Login**

   - **Route:** `{domain}/api/auth/login` `POST`

3. **Create Room (Only Accessible by Admin)**

   - **Route:** `{domain}/api/rooms` `POST`

4. **Get a Room**

   - **Route:** `{domain}/api/rooms/:id` `GET`

5. **Get All Rooms**

   - **Route:** `{domain}/api/rooms` `GET`

6. **Update Room (Only Accessible by Admin)**

   - **Route:** `{domain}/api/rooms/:id` `PUT`

7. **Delete a Room (Soft Delete, Only Accessible by Admin)**

   - **Route:** `{domain}/api/rooms/:id` `DELETE`

8. **Create Slot (Only Accessible by Admin)**

   - **Route:** `{domain}/api/slots` `POST`

9. **Get available slots**

   - **Route:** `{domain}/api/slots/availability` `GET`
   - **Route:** `{domain}/api/slots/availability?date=2024-06-15` `GET`
   - **Route:** `{domain}/api/slots/availability?roomId=60d9c4e4f3b4b544b8b8d1c5` `GET`
   - **Route:** `{domain}/api/slots/availability?date=2024-06-15&roomId=60d9c4e4f3b4b544b8b8d1c5` `GET`

10. **Create a Booking (Only Accessible by Authenticated User)**

- **Route:** `{domain}/api/bookings` `POST`

11. **Get All Bookings (Only Accessible by Admin)**

- **Route:** `{domain}/api/bookings` `GET`

12. **Get User's Bookings (Only Accessible by Authenticated User)**

- **Route:** `{domain}/api/my-bookings` `GET`

13. **Update Booking (Only Accessible by Admin)**

- **Route:** `{domain}/api/bookings/:id` `PUT`

14. **Delete Booking (Soft Delete, Only Accessible by Admin)**

- **Route:** `{domain}/api/bookings/:id` `DELETE`

## API Endpoints Detailed

### User Routes

1. **User Sign Up**

- _*Route:*_ `/api/auth/signup` (POST)
- **Request Body:**

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin", //role can be user or admin
  "address": "123 Main Street, City, Country"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country"
  }
}
```

**2\. User Login**

- _*Route:*_ `/api/auth/login` (POST)
- **Request Body:**

```json
{
  "email": "web@programming-hero.com",
  "password": "ph-password"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYyOWI4ZThjZmNkOTI2Mzg0YjZlNWUiLCJuYW1lIjoiUHJvZ3JhbW1pbmcgSGVyb3MiLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5MCIsInJvbGUiOiJhZG1pbiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQsIENpdHksIENvdW50cnkiLCJpYXQiOjE2MjQ1MTY2MTksImV4cCI6MTYyNDUyMDYxOX0.kWrEphO6lE9P5tvzrNBwx0sNogNuXpdyG-YoN9fB1W8",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country"
  }
}
```

###

### Room Routes

**3\. Create Room (Only Accessible by Admin)**

- _*Route:*_ `/api/rooms` (POST)
- **Request Headers:**

```plain
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

- _*Request Body:*_

```json
{
  "name": "Conference Room",
  "roomNo": 201,
  "floorNo": 1,
  "capacity": 20,
  "pricePerSlot": 100,
  "amenities": ["Projector", "Whiteboard"]
}
```

- _*Response:*_

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 100,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

**4\. Get a Room**

- _*Route:*_ `/api/rooms/:id` (GET)
- _*Response:*_

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room retrieved successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 100,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

**5\. Get All Rooms**

- _*Route:*_ `/api/rooms` (GET)
- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Rooms retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "name": "Meeting Room",
      "roomNo": 301,
      "floorNo": 2,
      "capacity": 10,
      "pricePerSlot": 200,
      "amenities": ["Whiteboard"],
      "isDeleted": false
    }
    // Other available rooms
  ]
}
```

**6\. Update Room (Only Accessible by Admin)**

- _*Route:*_ `/api/rooms/:id` (PUT)
- **Request Headers:**

```plain
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

- **Request Body:**

```json
{
  "pricePerSlot": 200 //we can update any field dynamically, (e.g., name, roomNo, floorNo, capacity, pricePerSlot, amenities)..
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 200,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

**7\. Delete a Room (Soft Delete, Only Accessible by Admin)**

- _*Route:*_ `/api/rooms/:id` (DELETE)
- **Request Headers:**

```plain
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 200,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": true
  }
}
```

###

### Slot Routes

8\. **Create Slot (Only Accessible by Admin)**

- _*Route:*_ `/api/slots`(**POST**)

**Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

**Request Body:**

```json
{
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "09:00",
  "endTime": "14:00"
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Slots created successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c8",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "11:00",
      "endTime": "12:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c9",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "12:00",
      "endTime": "13:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1ca",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "13:00",
      "endTime": "14:00",
      "isBooked": false
    }
  ]
}
```

**9\. Get available slots**

**Route:** `/api/slots/availability`(**GET**)

**Query Parameters:**

- `date`: The specific date for which available slots are requested (format: YYYY-MM-DD).
- `roomId`: ID of the room for which available slots are requested.

> Special Remarks

If we hit `/api/slots/availability` without any query params then we should get all the slots that are not booked ( isBooked: false)

**Request endpoint example**

`/api/slots/availability?date=2024-06-15&roomId=60d9c4e4f3b4b544b8b8d1c5`

or

`/api/slots/availability`

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Available slots retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": false
    }
  ]
}
```

###

### Booking Routes

**10\. Create a Booking (Only Accessible by Authenticated User)**

- _*Route:*_ `/api/bookings` (POST)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

- **Request Body:**

```json
{
  "date": "2024-06-15",
  "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "user": "60d9c4e4f3b4b544b8b8d1c4"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c9",
    "date": "2024-06-15",
    "slots": [
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "09:00",
        "endTime": "10:00",
        "isBooked": true
      },
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c7",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "11:00",
        "isBooked": true
      }
    ],
    "room": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    "user": {
      "_id": "60d9c4e4f3b4b544b8b8d1c4",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "address": "123 Main St, Anytown, USA",
      "role": "user"
    },
    "totalAmount": 200,
    "isConfirmed": "unconfirmed",
    "isDeleted": false
  }
}
```

**11\. Get All Bookings (Only Accessible by Admin)**

- _*Route:*_ `/api/bookings` (GET)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "All bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c9",
      "date": "2024-06-15",
      "slots": [
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c6",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "09:00",
          "endTime": "10:00",
          "isBooked": true
        },
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c7",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "10:00",
          "endTime": "11:00",
          "isBooked": true
        }
      ],
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "address": "123 Main St, Anytown, USA",
        "role": "user"
      },
      "totalAmount": 200,
      "isConfirmed": "unconfirmed",
      "isDeleted": false
    }
    // other bookings ( If any )
  ]
}
```

**12\. Get User's Bookings (Only Accessible by Authenticated User)**

- _*Route:*_ `/api/my-bookings`(**GET**)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1ca",
      "date": "2024-06-15",
      "slots": [
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c6",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "09:00",
          "endTime": "10:00",
          "isBooked": true
        },
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c7",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "10:00",
          "endTime": "11:00",
          "isBooked": true
        }
      ],
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "totalAmount": 200,
      "isConfirmed": "unconfirmed",
      "isDeleted": false
    }
  ]
}
```

**13\. Update Booking (Only Accessible by Admin)**

- _*Route:*_ `/api/bookings/:id` (PUT)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

- **Request Body:**

```json
{
  "isConfirmed": "confirmed"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1ca",
    "date": "2024-06-15",
    "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
    "totalAmount": 200,
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "isConfirmed": "confirmed",
    "isDeleted": false
  }
}
```

**14\. Delete Booking (Soft Delete, Only Accessible by Admin)**

- _*Route:*_ `/api/bookings/:id` (DELETE)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1ca",
    "date": "2024-06-15",
    "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
    "totalAmount": 200,
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "isConfirmed": "confirmed",
    "isDeleted": true
  }
}
```

## Others

### **1\. No Data Found:**

When retrieving data, if the database collection is empty or no matching data is found, return the message: "No data found."

```json
{
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data": []
}
```

### **2\. Error Handling:**

Implement proper error handling throughout the application. Use global error handling `middleware` to catch and handle errors, providing appropriate error responses with error messages.

**Error Response Object Should include the following properties:**

- success → false
- message → Error Type → Validation Error, Cast Error, Duplicate Entry
- errorMessages
- stack

**Sample Error Response**

```json
   {
    "success": false,
    "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }",
    "errorMessages": [
        {
            "path": "",
            "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }"
        }
    ],
    "stack": "MongoServerError: E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }\\n    at H:\\\\next-level-development\\\\university-management-auth-service\\\\node_modules\\\\mongodb\\\\src\\\\operations\\\\insert.ts:85:25\\n    at H:\\\\next-level-development\\\\university-management-auth-service\\\\node_modules\\\\mongodb\\\\src\\\\cmap\\\\connection_pool.ts:574:11\\n    at H:\\\\next-level-development\\\\university-writeOrBuffer (node:internal/streams/writable:391:12)"
}
```

###

### **3\. Not Found Route:**

Implement a global "Not Found" handler for unmatched routes. When a route is not found, respond with a generic message: "Not Found.”

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Not Found"
}
```

### **4\. Authentication Middleware:**

Implement an Authentication Middleware to authenticate your application. Ensures that only user and admin can access their own accessible routes.

```json
{
  "success": false,
  "statusCode": 401,
  "message": "You have no access to this route"
}
```

### **5\. Zod Validation:**

The API employs Zod for input validation, ensuring data consistency. When validation fails, a 400 Bad Request status code is returned, accompanied by detailed error messages specifying the erroneous fields and reasons.
