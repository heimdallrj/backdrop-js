import jwt from 'jsonwebtoken';

import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';
import { jwtSecret } from 'config';

export function auth(req, res, next) {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(' ')[1];

    const user = jwt.verify(token, jwtSecret);

    const _user = db().users.findOne({ _id: user._id });

    if (!_user || _user.role !== user.role || _user.status !== user.status) {
      return response.forbidden(res);
    }

    return next();
  }
  return response.unauthorized(res);
}
