import express from 'express';
import fs from 'fs';
import path from 'path';

import { proxy } from 'utils/handler';

const router = express.Router();

fs.readdir(path.join(__dirname, '../resources'), (err, resources) => {
  if (err) return;

  resources.forEach((fp) => {
    const config = fs.readFileSync(
      path.join(__dirname, `../resources/${fp}`),
      'utf-8'
    );

    const { name, type, methods, ...restConfig } = JSON.parse(config);

    if (!type || type === 'default') {
      methods.forEach((methodKey) => {
        const method = methodKey.toLowerCase();
        router[method](`/${name}`, (req, res) => res.send(`${method} ${name}`));
      });
    }

    if (type === 'proxy') {
      router.get(`/${name}`, proxy.bind(null, restConfig));
    }

    if (type === 'static') {
      // TODO
    }
  });
});

router.get('/', (req, res) => res.send('hello world'));

export default router;
