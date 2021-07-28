import forEach from 'lodash/forEach';

import { db } from 'utils/database/jsondb';
import { response } from 'utils/http';
import * as customHanlders from 'handlers/custom';

export default function getSingle(req, res) {
  try {
    const { resourceConfig } = req;

    if (resourceConfig.type === 'custom') {
      return customHanlders[resourceConfig.type](req, res);
    }

    const collName = `_${resourceConfig.name}`;

    const doc = db[collName].findOne({ _id: req.params.id });
    if (!doc) return response.notFound(res);

    // Process relationship configs
    const { schema } = resourceConfig;

    forEach(schema, (val, key) => {
      if (val.relationship) {
        let docs = [];

        val.relationship.forEach(({ selector }) => {
          const query = {};
          query[selector] = req.params.id;
          docs = db[`_${key}`].find(query);
          doc[key] = docs || [];
        });
      }
    });

    return response.ok(res, doc);
  } catch (err) {
    return response.internalError(res);
  }
}
