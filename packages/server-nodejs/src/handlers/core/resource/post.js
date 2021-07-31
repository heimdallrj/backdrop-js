import { response } from 'utils/http';
import JsonDB, { db } from 'database';

export default function post(req, res) {
  // TODO Validate request body
  const resource = req.body;
  const doc = db('resources').insert(resource);
  if (doc && doc.type === 'default') {
    JsonDB.createCollection(`_${doc.name}`);
  }
  response.ok(res, doc);
}
