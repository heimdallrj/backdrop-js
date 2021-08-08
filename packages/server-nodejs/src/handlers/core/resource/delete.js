import { response } from 'utils/http';
import { db } from 'database';

export default function getSingle(req, res) {
  const { name } = req.params;
  response.ok(res, db('resources').remove({ name }));
}
