import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function getSingle(req, res) {
  try {
    const user = db.users.findOne({ _id: req.params.id });
    delete user.password;
    return response.ok(res, user);
  } catch (err) {
    return response.internalError(res);
  }
}
