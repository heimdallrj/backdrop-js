import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function put(req, res) {
  const { resourceConfig } = req;
  const collName = `_${resourceConfig.name}`;
  const { id: _id } = req.params;

  const doc = db[collName].findOne({ _id });
  if (!doc) return response.notFound(res);

  const newDoc = {
    ...req.body,
    _id,
  };

  const updatedDoc = db[collName].updateOne({ _id }, newDoc);
  if (!updatedDoc) return response.internalError(res);
  return response.ok(res, updatedDoc);
}
