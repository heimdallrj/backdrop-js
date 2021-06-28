import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function getSingle(req, res) {
  const { resourceConfig } = req;
  const collName = `_${resourceConfig.name}`;

  const doc = db[collName].findOne({ _id: req.params.id });
  if (!doc) return response.notFound(res);

  return response.ok(res, doc);
}
