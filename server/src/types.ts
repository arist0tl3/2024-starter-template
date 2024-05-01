import DataLoader from 'dataloader';

import type { Models } from './models';

import { IUser } from './models/User/model';

export interface IDataloaders {
  userLoader: DataLoader<string, IUser, string>;
}

export interface IContext {
  currentUser?: IUser | null;
  dataLoaders: IDataloaders;
  models: Models;
}
