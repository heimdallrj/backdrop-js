import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';
import * as customHanlders from 'handlers/custom';

export default function getSingle(req, res) {
  const { resourceConfig } = req;

  if (resourceConfig.type === 'custom') {
    return customHanlders[resourceConfig.type](req, res);
  }

  const collName = `_${resourceConfig.name}`;

  const doc = db[collName].findOne({ _id: req.params.id });
  if (!doc) return response.notFound(res);

  return response.ok(res, doc);
}
