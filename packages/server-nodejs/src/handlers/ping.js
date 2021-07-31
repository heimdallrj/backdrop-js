import { db } from 'database/jsondb';
import { response } from 'utils/http';

import { baseUrl } from 'config';

export function get(req, res) {
  try {
    let toResponse = null;
    const config = db().config.findOne({ type: 'app' });
    if (config) {
      toResponse = {
        name: config.appName,
        description: config.appDesc,
        baseUrl,
      };
    }
    response.ok(res, toResponse);
  } catch (err) {
    response.ok(res, null);
  }
}
