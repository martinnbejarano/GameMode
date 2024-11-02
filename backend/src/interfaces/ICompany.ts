import { Types } from "mongoose";

export interface ICompany {
  _id: Types.ObjectId;
  email?: string;
  password?: string;
  username?: string;
  resetPasswordToken?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
