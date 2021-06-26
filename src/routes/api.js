import express from 'express';

import { proxy } from 'utils/handler';
import { response } from 'utils/http';
import { db } from 'utils/database/jsondb';
import * as handlers from 'handlers';

const router = express.Router();

const resources = db.resources.find();

resources.forEach((resource) => {
  const { name, type, methods, status, ...restConfig } = resource;
  const resourceRoute = `/${name}`;
  let handler = () => {};

  if (status === 'published') {
    if (!type || type === 'default') {
      methods.forEach((m) => {
        const method = m.toLowerCase();

        if (method === 'get') {
          router.get(resourceRoute, handlers.get.bind(this, resource));

          router.get(
            `${resourceRoute}/:id`,
            handlers.getById.bind(this, resource)
          );
        }

        if (method === 'post') {
          router.post(resourceRoute, handlers.post.bind(this, resource));
        }

        if (method === 'put') {
          router.put(`${resourceRoute}/:id`, handlers.put.bind(this, resource));
        }

        if (method === 'patch') {
          router.patch(
            `${resourceRoute}/:id`,
            handlers.patch.bind(this, resource)
          );
        }

        if (method === 'delete') {
          router.delete(
            `${resourceRoute}/:id`,
            handlers.delete.bind(this, resource)
          );
        }
      });
    }

    if (type === 'proxy') {
      handler = proxy.bind(null, restConfig);
      router.get(resourceRoute, handler);
    }

    if (type === 'static') {
      // TODO
    }
  }
});

router.get('/', (req, res) => response.success(res));

export default router;
