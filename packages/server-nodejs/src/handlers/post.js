import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';
import * as customHanlders from 'handlers/custom';

export default function post(req, res) {
  const { resourceConfig } = req;

  if (resourceConfig.type === 'custom') {
    return customHanlders[resourceConfig.type](req, res);
  }

  const newDoc = req.body;
  const collName = `_${resourceConfig.name}`;

  const doc = db[collName].insert(newDoc);
  return response.ok(res, doc);
}
