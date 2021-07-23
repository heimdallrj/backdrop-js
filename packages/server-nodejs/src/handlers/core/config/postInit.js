import bcrypt from 'bcrypt';
import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

import { salt } from 'config';

export default function postInit(req, res) {
  const {
    config: { appName, appDesc, baseUrl, database },
    user: { screenName, userName, email, password },
  } = req.body;

  // config
  const admin = {
    screenName,
    userName,
    email,
  };
  const config = { type: 'app', appName, appDesc, baseUrl, database, admin };
  const configCreated = db.config.insert(config);

  // user
  const user = {
    screenName,
    userName,
    email,
    password: bcrypt.hashSync(password, salt),
    role: 0,
    status: 1,
  };
  db.users.insert(user);

  return response.ok(res, configCreated);
}
