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

export function get() {
  return _db;
}

export function db() {
  return getCollections();
}

export function connect(config = {}) {
  if (!_db) {
    _db = new JsonDB(jsonDbPath, config);
  }
  return _db;
}
