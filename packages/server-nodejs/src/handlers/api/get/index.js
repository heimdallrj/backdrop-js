/* eslint no-param-reassign: 0 */

import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';
import * as customHanlders from 'handlers/custom';
import proxy from './proxy';

export default function get(req, res) {
  try {
    const { resourceConfig, query } = req;
    const { search, offset, limit } = query || {};

    if (resourceConfig.type === 'proxy') {
      return proxy(resourceConfig, req, res);
    }

    if (resourceConfig.type === 'custom') {
      return customHanlders[resourceConfig.type](req, res);
    }

    let docs = [];

    const collName = `_${resourceConfig.name}`;
    docs = db()[collName].find();

    // search
    // TODO: Move this logic to JsonDB
    if (search && search !== '') {
      const [field, keyword] = search.split('|');
      const _docs = docs.filter((doc) => {
        if (!doc[field] || !keyword) return false;
        return doc[field].includes(keyword);
      });
      docs = _docs;
    }
    // pagination
    // TODO: Move this logic to JsonDB
    if (offset && limit) {
      const start = Number(offset);
      const end = Number(offset) + Number(limit);
      docs = docs.slice(start, end);
    }

    return response.ok(res, docs);
  } catch (err) {
    return response.internalError(res);
  }
}
