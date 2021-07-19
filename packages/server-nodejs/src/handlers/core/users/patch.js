import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function patch(req, res) {
  const userId = req.params.id;
  const userPartial = req.body;
  const user = db.users.find({ id: userId });

  delete userPartial.password;
  delete userPartial._id;
  const userToUpdate = { ...user, ...userPartial };

  db.users.update({ _id: userId }, userToUpdate);

  delete user.password;
  return response.ok(res, user);
}
