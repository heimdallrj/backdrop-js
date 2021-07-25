// TODO: Enable when ready.

// import jwt from 'jsonwebtoken';

// import { db } from 'utils/database/jsondb';
// import { response } from 'utils/http';
// import { jwtSecret } from 'config';

// eslint-disable-next-line consistent-return
export function auth(req, res, next) {
  // const { authorization } = req.headers;

  // if (authorization) {
  //   const token = authorization.split(' ')[1];

  //   jwt.verify(token, jwtSecret, async (err, user) => {
  //     if (err) {
  //       return response.forbidden(res);
  //     }

  //     const _user = db.users.findOne({ _id: user._id });
  //     if (!_user || _user.role !== user.role || _user.status !== user.status) {
  //       return response.forbidden(res);
  //     }
  //     return next();
  //   });
  // } else {
  //   return response.unauthorized(res);
  // }

  return next();
}
