import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function postInit(req, res) {
  const config = { ...req.body, type: 'app' };
  console.log('>>>>>', config);
  const configCreated = db.config.insert(config);
  return response.ok(res, configCreated);
}
