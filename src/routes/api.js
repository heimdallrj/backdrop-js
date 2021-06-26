import express from 'express';

import * as jsonDb from 'utils/database/jsonDb';
import { proxy } from 'utils/handler';
import { response } from 'utils/http';

const router = express.Router();

const resources = jsonDb.get('resources');

resources.forEach((resource) => {
  const { name, type, methods, status, ...restConfig } = resource;
  const route = `/${name}`;
  let handler = () => {};

  if (status === 'published') {
    if (!type || type === 'default') {
      methods.forEach((methodKey) => {
        const method = methodKey.toLowerCase();
        handler = (req, res) => response.success(res, `${method} ${name}`); // TODO Return actual response
        router[method](route, handler);
      });
    }

    if (type === 'proxy') {
      handler = proxy.bind(null, restConfig);
      router.get(route, handler);
    }

    if (type === 'static') {
      // TODO
    }
  }
});

router.get('/', (req, res) => response.success(res));

export default router;
