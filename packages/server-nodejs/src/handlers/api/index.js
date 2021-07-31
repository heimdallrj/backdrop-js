import { db } from 'database/jsondb';

import { baseUrl } from 'config';

const namespace = 'api';

export { default as get } from './get';
export { default as getSingle } from './getSingle';
export { default as post } from './post';
export { default as put } from './put';
export { default as patch } from './patch';
export { default as delete } from './delete';

export function api(req, res) {
  const docs = db().resources.find({
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

  const appConfig = db().config.findOne({ type: 'app' });
  const { appName, appDesc } = appConfig;

  return res.json({
    name: appName,
    description: appDesc,
    baseUrl,
    namespace,
    routes,
    _links: {},
  });
}
