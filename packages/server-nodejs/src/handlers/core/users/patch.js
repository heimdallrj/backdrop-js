import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function patch(req, res) {
  try {
    const userId = req.params.id;
    const userPartial = req.body;
    const _user = db().users.findOne({ _id: userId });

    delete userPartial.password;
    delete userPartial._id;
    const userToUpdate = { ..._user, ...userPartial };

    const user = db().users.updateOne({ _id: userId }, userToUpdate);

    delete user.password;
    return response.ok(res, user);
  } catch (err) {
    return response.internalError(res);
  }
}
