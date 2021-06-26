import { response } from 'utils/http';
import { db } from 'utils/database/jsondb';

export default function get(req, res, { name }) {
  const docs = db[name].find();
  return response.success(res, docs);
}
