import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';

import { db } from 'database';
import { response } from 'utils/http';
import Mailer from 'utils/email';

import { jwtSecret, salt, baseUrl } from 'config';

const defaultUserConfig = {
  role: 3,
  status: 0,
  token: uniqid(),
};

// eslint-disable-next-line consistent-return
export default function post(req, res) {
  try {
    // TODO Validate user
    const reqBody = req.body;
    const { screenName, userName, email, password, role } = reqBody;
    const user = {
      ...defaultUserConfig,
      screenName,
      userName,
      email,
      password: bcrypt.hashSync(password, salt),
      role: role || defaultUserConfig.role,
    };

    const _user = db().users.find({ email: user.email });
    // If user exists, return error
    if (_user && _user.length > 0) {
      return response.bad(res, 'User already exists');
    }

    const userCreated = db().users.insert(user);
    delete userCreated.password;
    delete userCreated.token;

    // TODO: Send email
    const mailer = new Mailer();
    mailer.send(
      email,
      'Verify your account',
      `${baseUrl}/auth/user?token=${defaultUserConfig.token}`,
      (err) => {
        if (err) return response.internalError(res);

        const token = jwt.sign(userCreated, jwtSecret);
        return response.ok(res, { user: userCreated, token });
      }
    );
  } catch (err) {
    return response.internalError(res);
  }
}
