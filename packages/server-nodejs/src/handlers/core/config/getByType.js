import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';

export default function getByType(req, res) {
  const { type } = req.params;
  try {
    const config = db().config.find({ type });
    const toResponse = (config && config[0]) || {};
    response.ok(res, toResponse);
  } catch (err) {
    response.internalError(res);
  }
}
