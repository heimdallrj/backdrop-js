import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';
import * as customHanlders from 'handlers/custom';
import proxy from './proxy';

export default function get(req, res) {
  try {
    const { resourceConfig } = req;

    if (resourceConfig.type === 'proxy') {
      return proxy(resourceConfig, req, res);
    }

    if (resourceConfig.type === 'custom') {
      return customHanlders[resourceConfig.type](req, res);
    }

    const collName = `_${resourceConfig.name}`;
    const docs = db()[collName].find();

    // TODO: Implements pagination and search

    return response.ok(res, docs);
  } catch (err) {
    return response.internalError(res);
  }
}
