import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function getInit(req, res) {
  try {
    const config = db.config.find({ type: 'app' });
    const toResponse = (config && config[0]) || {};
    // TODO Update .env file
    response.ok(res, toResponse);
  } catch (err) {
    response.internalError(res);
  }
}
