import { Types } from "mongoose";

export interface ICompany {
  _id: string;
  email?: string;
  password?: string;
  username?: string;
  games?: Types.ObjectId[];
  resetPasswordToken?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
