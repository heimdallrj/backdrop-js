import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function getSingle(req, res) {
  const user = db.users.find({ id: req.params.id });
  delete user.password;
  return response.ok(res, user);
}
