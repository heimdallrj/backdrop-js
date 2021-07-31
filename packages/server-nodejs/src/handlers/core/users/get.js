import { db } from 'database';
import { response } from 'utils/http';

const sanatize = (users = []) =>
  users.map((user) => {
    // eslint-disable-next-line no-param-reassign
    delete user.password;
    return user;
  });

export default function get(req, res) {
  const users = db().users.find();
  return response.ok(res, sanatize(users));
}
