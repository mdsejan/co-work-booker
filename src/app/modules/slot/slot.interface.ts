export interface ISlot {
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface QueryParams {
  date?: string;
  room?: string;
  isbooked?: boolean;
}
