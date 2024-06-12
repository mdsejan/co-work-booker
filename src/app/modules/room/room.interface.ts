export interface IRoom {
  name: string;
  roomNo: string;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
}
