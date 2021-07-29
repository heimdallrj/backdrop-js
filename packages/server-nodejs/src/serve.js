import path from 'path';
import * as config from 'config';

import { ensureDirSync } from 'utils/fs';
import { connect as connectJsonDb } from 'utils/database/jsondb';

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
      ],
    });
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
