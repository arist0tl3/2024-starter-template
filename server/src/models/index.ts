import type { Model } from "mongoose";

import AuthToken, { IAuthToken } from "./AuthToken/model";
import Book, { IBook } from "./Book/model";
import PassCodeToken, { IPassCodeToken } from "./PassCodeToken/model";
import User, { IUser } from "./User/model";

export type Models = {
  AuthToken: Model<IAuthToken, {}, {}, {}>;
  Book: Model<IBook, {}, {}, {}>;
  PassCodeToken: Model<IPassCodeToken, {}, {}, {}>;
  User: Model<IUser, {}, {}, {}>;
};

const models: Models = {
  AuthToken,
  Book,
  PassCodeToken,
  User,
};

export default models;
