import { db } from 'database/jsondb';
import { response } from 'utils/http';

export default function del(req, res) {
  const { id } = req.params;
  const userDeleted = db().users.remove({ _id: id });
  return response.ok(res, userDeleted);
}
