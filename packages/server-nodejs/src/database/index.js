import path from 'path';
import { ensureDirSync } from 'utils/fs';

import { connect as connectJsonDb } from 'database/jsondb';
import { dbConnection, jsonDbPath } from 'config';

import userRoles from './initialData/user_roles.json';
import userStatus from './initialData/user_status.json';

export const connect = (cb) => {
  try {
    switch (dbConnection) {
      case 'jsondb':
        ensureDirSync(path.join(jsonDbPath, '.jsondb'));
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
              data: userStatus,
            },
            {
              coll: 'user_roles',
              data: userRoles,
            },
          ],
        });
        cb(null, true);
        break;

      case 'mongodb':
        break;
      default:
        cb('not implemented', null);
        break;
    }
  } catch (e) {
    cb('Database connection failed.', null);
  }
};
