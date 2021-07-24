import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

const defaultConfigs = {
  enableSignUp: true,
  loginOptions: ['default'],
  smtp: {
    host: 'smtp.example.com',
    port: 2525,
    auth: {
      user: '$user',
      pass: '$pass',
    },
  },
};

export default function getByType(req, res) {
  try {
    const { type } = req.params;
    const { admin, config } = req.body;

    const _config = db.config.findOne({ type });

    let _admin = _config.admin;
    if (admin && typeof admin === 'object') {
      _admin = { ..._config.admin, ...admin };
    }

    const configToSave = {
      ...defaultConfigs,
      ..._config,
      ...config,
      admin: _admin,
    };

    const doc = db.config.updateOne({ type }, configToSave);
    response.ok(res, doc);
  } catch (err) {
    response.internalError(res);
  }
}
