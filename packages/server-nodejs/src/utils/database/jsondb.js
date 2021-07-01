import JsonDB from '@backdrop/node-jsondb';

import { jsonDbPath, baseUrl, appName, appDesc } from 'config';

const JsonDb = new JsonDB(jsonDbPath, {
  initialData: [
    {
      coll: `users`,
      data: [],
    },
    {
      coll: `config`,
      data: [
        {
          type: 'app',
          baseUrl,
          appName,
          appDesc,
          defaultDBConn: 'jsondb',
        },
      ],
    },
    {
      coll: 'resources',
      data: [],
    }
  ],
});

export const db = JsonDb.collections;
export default JsonDb;
