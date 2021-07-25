import bcrypt from 'bcrypt';
import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';
import uniqid from 'uniqid';

import { salt } from 'config';

const defaultConfig = {
  enableSignUp: true,
  auth: ['default'],
};

const defaultUserConfig = {
  role: 0,
  status: 1,
  token: uniqid(),
};

export function post(req, res) {
  try {
    const config = db.config.findOne({ type: 'app' });
    // Already bootstrapped
    if (config) {
      return response.unauthorized(res);
    }

    // Bootstrap
    const { appName, appDesc, adminUser } = req.body;
    const { screenName, userName, email, password } = adminUser;

    // @config
    let configCreated = null;
    const _config = {
      appName,
      appDesc,
      ...defaultConfig,
      adminUser: { screenName, userName, email },
    };
    configCreated = db.config.insert(_config);

    // @user
    const user = {
      screenName,
      userName,
      email,
      password: bcrypt.hashSync(password, salt),
      ...defaultUserConfig,
    };
    db.users.insert(user);

    return response.ok(res, configCreated);
  } catch (err) {
    return response.internalError(res);
  }
}
