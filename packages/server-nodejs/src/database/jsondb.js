import JsonDB from '@backdropjs/jsondb';

import { jsonDbPath } from 'config';

let _db = null;
let _collection = null;

const getCollections = () => {
  if (!_db) {
    _db = new JsonDB(jsonDbPath, {});
  }
  _collection = _db.collections;
  return _collection;
};

export const connect = (config = {}) => new JsonDB(jsonDbPath, config);

export function db() {
  return getCollections();
}
