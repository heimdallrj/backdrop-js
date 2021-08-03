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

export function db(coll = null) {
  if (!coll) return getCollections();
  return getCollections()[coll];
}

export function createCollection(collName) {
  _db.createCollection(collName);
}

export function connect(config = {}) {
  if (!_db) {
    _db = new JsonDB(jsonDbPath, config);
  }
  return _db;
}
