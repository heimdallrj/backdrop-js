import { response } from 'utils/http';
import { db } from 'database';

export default function getSingle(req, res) {
  // TODO Validate request body
  const { name } = req.params;
  const newDoc = req.body;
  const doc = db('resources').updateOne({ name }, newDoc);
  response.ok(res, doc);
}
