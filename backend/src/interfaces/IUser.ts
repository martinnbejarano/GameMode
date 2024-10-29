import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  email?: string;
  password?: string;
  username?: string;
  birthday?: Date;
  profilePicture?: string | null;
  games?: Types.ObjectId[];
  wishlist?: Types.ObjectId[];
  resetPasswordToken?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
