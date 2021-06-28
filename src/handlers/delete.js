import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function del(req, res) {
  const { resourceConfig } = req;
  const { id: _id } = req.params;
  const collName = `_${resourceConfig.name}`;

  const success = db[collName].remove({ _id });
  if (!success) return response.internalError(res);
  return response.ok(res);
}
