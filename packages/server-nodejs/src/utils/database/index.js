import JsonDB from '@backdropjs/jsondb';

import { jsonDbPath } from 'config';
import logger from 'utils/logger';

export const init = (dbPath = jsonDbPath) => {
  try {
    const db = new JsonDB(dbPath);
    logger.log(db.ping());
  } catch (err) {
    logger.log(err);
  }
};
