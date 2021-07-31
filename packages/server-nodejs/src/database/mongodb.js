import { dbMongoUrl } from 'config';

const mongoClient = require('mongodb').MongoClient;

let _db;

export async function connect() {
  _db = await mongoClient.connect(dbMongoUrl);
  return true;
}

export function get() {
  return _db && _db.db('backdropjs');
}

export function db(coll = null) {
  if (!coll) return _db.db('backdropjs');
  return _db.db('backdropjs').collection(coll);
}

export function close() {
  _db.close();
}
