import { db } from 'utils/database/jsondb';

import { baseUrl, appName, appDesc } from 'config';

const namespace = 'api';

export default function api(req, res) {
  const docs = db.resources.find({
    namespace,
    private: false,
    status: 'published',
  });
  const routes = {};
  docs.forEach(({ name, methods, type }) => {
    routes[`/${name}`] = {
      methods: methods.filter((m) => ['get', 'post'].includes(m)),
      _links: {
        self: `${baseUrl}/${namespace}/${name}`,
      },
    };

    if (type !== 'proxy') {
      routes[`/${name}/:id`] = {
        methods: methods.filter((m) =>
          ['get', 'put', 'patch', 'delete'].includes(m)
        ),
        _links: {
          self: `${baseUrl}/${namespace}/${name}/:id`,
        },
      };
    }
  });
  return res.json({
    name: appName,
    description: appDesc,
    baseUrl,
    namespace,
    routes,
    _links: {},
  });
}
