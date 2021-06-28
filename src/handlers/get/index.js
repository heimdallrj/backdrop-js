import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';
import proxy from './proxy';

export default function get(req, res) {
  const { resourceConfig } = req;

  if (resourceConfig.type === 'proxy') {
    return proxy(resourceConfig, req, res);
  }

  const collName = `_${resourceConfig.name}`;
  const docs = db[collName].find();
  return response.ok(res, docs);
}
