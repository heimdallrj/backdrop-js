import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from 'database';
import { response } from 'utils/http';
import uniqid from 'uniqid';

import { jwtSecret } from 'config';

export function get(req, res) {
  try {
    const { token } = req.query;
    const user = db().users.findOne({ token });

    // No user found
    if (!user) return response.unauthorized(res);

    // If user found, change token to expire
    const _user = { ...user, status: 1, token: uniqid() };
    db().users.updateOne({ token }, _user);
    // return response.ok(res);
    return res.redirect('/');
  } catch (err) {
    return response.internalError(res);
  }
}

export function post(req, res) {
  try {
    // TODO: Should allow use email or username
    const { userName, password } = req.body;

    const user = db().users.findOne({ userName });
    const validUser = bcrypt.compareSync(password, user.password);

    if (!validUser) return response.unauthorized(res);

    delete user.password;
    delete user.token;
    const token = jwt.sign(user, jwtSecret);
    return response.ok(res, { user, token });
  } catch (err) {
    return response.internalError(res);
  }
}
