import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function get(req, res) {
  try {
    const config = db().config.find({});
    response.ok(res, config);
  } catch (err) {
    response.internalError(res);
  }
}
