import { response } from 'utils/http';
import { db } from 'database';

export default function getSingle(req, res) {
  const { id } = req.params;
  const resourceSingle = db('resources').findOne({ _id: id });
  response.ok(res, resourceSingle);
}
