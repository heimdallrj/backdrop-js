import { dbMongoUrl } from 'config';

const mongoClient = require('mongodb').MongoClient;

let mongodb;

export async function connect() {
  await mongoClient.connect(dbMongoUrl);
  return true;
}

export function get() {
  return mongodb;
}

export function close() {
  mongodb.close();
}
