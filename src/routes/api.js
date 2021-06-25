import express from 'express';
import fs from 'fs';
import path from 'path';

import { proxy } from 'utils/handler';
import { response } from 'utils/http';

const router = express.Router();

fs.readdir(path.join(__dirname, '../resources'), (err, resources) => {
  if (err) return;

  resources.forEach((fp) => {
    const config = fs.readFileSync(
      path.join(__dirname, `../resources/${fp}`),
      'utf-8'
    );
    const { name, type, methods, status, ...restConfig } = JSON.parse(config);
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
});

router.get('/', (req, res) => response.success(res));

export default router;
