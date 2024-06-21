import { Types } from "mongoose";

export interface ISlot {
  room: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface QueryParams {
  date?: string;
  roomId?: string;
  isbooked?: boolean;
}
