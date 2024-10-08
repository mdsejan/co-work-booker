export interface IRoom {
  name: string;
  image: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
}

export interface RoomQuery {
  search?: string;
  minCapacity?: string;
  maxCapacity?: string;
  minPrice?: string;
  maxPrice?: string;
  sortPrice?: "priceAsc" | "priceDesc";
}

export interface Room {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
  image: string;
}
