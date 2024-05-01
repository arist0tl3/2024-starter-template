import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IAuthToken {
  _id: string;
  expiresAt: Date;
  phoneNumber: string;
  userId: string;
}

const authTokenSchema = new Schema<IAuthToken>({
  _id: { type: String, required: true, default: uuidv4 },
  expiresAt: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  userId: { type: String, required: true },
});

const AuthToken = model<IAuthToken>("AuthToken", authTokenSchema);

export default AuthToken;
