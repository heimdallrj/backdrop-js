import { response } from 'utils/http';
import { db } from 'utils/database/jsondb';

export default function getSingle(req, res) {
  const { id } = req.params;
  response.ok(res, db().resources.remove({ _id: id }));
}
