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
