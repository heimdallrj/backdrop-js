import { db } from 'database';
import { response } from 'utils/http';

export default function get(req, res) {
  const resources = db('resources').find({});
  response.ok(res, resources);
}
