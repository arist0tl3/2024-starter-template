import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import buildSchema from './utils/buildSchema';
import getUser from './utils/getUser';

import createDataLoaders from '../dataloaders/createDataLoaders';

import models, { Models } from '../models';
import { IUser } from '../models/User/model';

import { IContext } from '../types';

const { MONGO_URI, PORT = '4000', NODE_ENV } = process.env;

async function init(): Promise<void> {
  try {
    if (!MONGO_URI) throw new Error('Missing mongo config');

    await mongoose.connect(MONGO_URI);

    if (NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }

    const schema = buildSchema();

    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer<IContext>({
      schema,
      csrfPrevention: true,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: parseInt(PORT, 10) },
      context: async ({ req }) => {
        let currentUser;

        if (req?.headers?.authorization?.includes('Bearer')) {
          currentUser = await getUser(req?.headers?.authorization, models);
        }

        return {
          currentUser,
          dataLoaders: createDataLoaders(models),
          models,
        };
      },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (err: any) {
    console.log(`Unable to start server: ${err.toString()}`);
  }
}

export default init;
