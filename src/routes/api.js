import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

fs.readdir(path.join(__dirname, '../resources'), (err, resources) => {
  if (err) return;

  resources.forEach((configFp) => {
    const config = fs.readFileSync(
      path.join(__dirname, `../resources/${configFp}`),
      'utf-8'
    );

    const { name, methods } = JSON.parse(config);
    // Resource Types: default, static, proxy

    methods.forEach((methodKey) => {
      const method = methodKey.toLowerCase();
      router[method](`/${name}`, (req, res) => res.send(`${method} ${name}`));
    });
  });
});

router.get('/', (req, res) => res.send('hello world'));

export default router;
