import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function post(req, res) {
  const { resourceConfig } = req;
  const newDoc = req.body;
  const collName = `_${resourceConfig.name}`;

  const doc = db[collName].insert(newDoc);
  return response.ok(res, doc);
}
