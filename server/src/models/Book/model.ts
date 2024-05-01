import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IBook {
  _id: string;
  createdAt: Date;
  createdById: string;
  deleted?: boolean;
  deletedAt?: Date;
  deletedById?: string;

  author: string;
  title: string;
}

const bookSchema = new Schema<IBook>({
  _id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, required: true, default: Date.now },
  deleted: { type: Boolean },
  deletedAt: { type: Date },
  deletedById: { type: String },

  author: { type: String, required: true },
  title: { type: String, required: true },
});

const Book = model<IBook>("Book", bookSchema);

export default Book;
