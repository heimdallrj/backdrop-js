import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

import { jwtSecret } from 'config';

export function post(req, res) {
  const { userName, password } = req.body;

  const user = db.users.findOne({ userName });
  const validUser = bcrypt.compareSync(password, user.password);

  if (!validUser) return response.unauthorized(res, 'Unauthorized');

  delete user.password;
  const token = jwt.sign(user, jwtSecret);
  return response.ok(res, { user, token });
}
