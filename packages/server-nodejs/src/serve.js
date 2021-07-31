import path from 'path';
import * as config from 'config';

import { ensureDirSync } from 'utils/fs';
import { connect as connectJsonDb } from 'database/jsondb';
import { connect as connectMongo } from 'database/mongodb';

async function ensureDbConn({ dbConnection }) {
  if (dbConnection === 'jsondb') {
    const jsonDbPath = path.join(__dirname, '..', '.jsondb');
    ensureDirSync(jsonDbPath);
    connectJsonDb({
      initialData: [
        {
          coll: 'users',
          data: [],
        },
        {
          coll: 'config',
          data: [],
        },
        {
          coll: 'resources',
          data: [],
        },
        {
          coll: 'user_status',
          data: [
            {
              status: 0,
              description: 'inactive',
            },
            {
              status: 1,
              description: 'active',
            },
            {
              status: 2,
              description: 'deleted',
            },
          ],
        },
        {
          coll: 'user_roles',
          data: [
            {
              role: 0,
              description: 'administrator',
            },
            {
              role: 1,
              description: 'manager',
            },
            {
              role: 2,
              description: 'editor',
            },
            {
              role: 3,
              description: 'subscriber',
            },
          ],
        },
      ],
    });
    return true;
  }

  if (dbConnection === 'mongodb') {
    connectMongo();
    return true;
  }

  throw new Error('not implemented');
}

export default async function serve(cb) {
  try {
    ensureDbConn(config);
    cb(null, true);
  } catch (err) {
    cb(err, null);
  }
}
