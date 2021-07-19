import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

import { jwtSecret } from 'config';

// bycrypt config
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export default function post(req, res) {
  const user = {
    ...req.body,
    password: bcrypt.hashSync(req.body.password, salt),
  };
  // TODO Validate user

  const userExists = db.users.find({ email: user.email });
  if (userExists && userExists.length > 0) {
    return response.bad(res, 'User already exists');
  }

  const userCreated = db.users.insert(user);
  delete userCreated.password;

  const token = jwt.sign(userCreated, jwtSecret);

  return response.ok(res, { token });
}
