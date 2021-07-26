import JsonDB from '@backdropjs/jsondb';

import { jsonDbPath } from 'config';

const JsonDb = new JsonDB(jsonDbPath, {
  // TODO: We should remove this from here logic once we support for other database drivers
  initialData: [
    {
      coll: `users`,
      data: [],
    },
    {
      coll: `config`,
      data: [],
    },
    {
      coll: 'resources',
      data: [],
    },
  ],
});

export const db = JsonDb.collections;
export default JsonDb;
