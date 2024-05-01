import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser {
  _id: string;
  createdAt: Date;
  email?: string;
  phoneNumber?: string;
}

const userSchema = new Schema<IUser>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  email: { type: String },
  phoneNumber: { type: String },
});

const User = model<IUser>("User", userSchema);

export default User;
