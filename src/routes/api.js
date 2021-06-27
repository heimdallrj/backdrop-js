import express from 'express';

import { validateResource, validateSchema } from 'middlewares';

import { db } from 'utils/database/jsondb';
import { proxy } from 'utils/handler';
import { response } from 'utils/http';

import { BASE_URL, APP_NAME, APP_DESC } from 'config';

const namespace = 'api';

const router = express.Router();

router.get('/:resource/:id', validateResource, (req, res) => {
  const { resourceConfig } = req;
  const collName = `_${resourceConfig.name}`;

  const doc = db[collName].findOne({ _id: req.params.id });
  if (!doc) return response.notFound(res);

  return response.ok(res, doc);
});

router.get('/:resource/', validateResource, (req, res) => {
  const { resourceConfig } = req;

  if (resourceConfig.type === 'proxy') {
    return proxy(resourceConfig, req, res);
  }

  const collName = `_${resourceConfig.name}`;
  const docs = db[collName].find();
  return response.ok(res, docs);
});

router.post('/:resource', [validateResource, validateSchema], (req, res) => {
  const { resourceConfig } = req;
  const newDoc = req.body;
  const collName = `_${resourceConfig.name}`;

  const doc = db[collName].insert(newDoc);
  return res.json(doc);
});

router.put('/:resource/:id', [validateResource, validateSchema], (req, res) => {
  const { resourceConfig } = req;
  const collName = `_${resourceConfig.name}`;
  const { id: _id } = req.params;

  const doc = db[collName].findOne({ _id });
  if (!doc) return response.notFound(res);

  const newDoc = {
    ...req.body,
    _id,
  };

  const updatedDoc = db[collName].updateOne({ _id }, newDoc);
  if (!updatedDoc) return response.internalError(res);
  return response.ok(res, updatedDoc);
});

router.patch(
  '/:resource/:id',
  [validateResource, validateSchema],
  (req, res) => {
    const { resourceConfig } = req;
    const { id: _id } = req.params;
    const collName = `_${resourceConfig.name}`;

    const doc = db[collName].findOne({ _id });
    if (!doc) return response.notFound(res);

    const newDoc = {
      ...doc,
      ...req.body,
      _id,
    };

    const updatedDoc = db[collName].updateOne({ _id }, newDoc);
    if (!updatedDoc) return response.internalError(res);
    return response.ok(res, updatedDoc);
  }
);

router.delete('/:resource/:id', validateResource, (req, res) => {
  const { resourceConfig } = req;
  const { id: _id } = req.params;
  const collName = `_${resourceConfig.name}`;

  const success = db[collName].remove({ _id });
  if (!success) return response.internalError(res);
  return response.ok(res);
});

router.get('/', (req, res) => {
  const docs = db.resources.find({
    namespace,
    status: 'published',
  });
  const routes = {};
  docs.forEach(({ name, methods, type }) => {
    routes[`/${name}`] = {
      methods: methods.filter((m) => ['get', 'post'].includes(m)),
      _links: {
        self: `${BASE_URL}/${namespace}/${name}`,
      },
    };

    if (type !== 'proxy') {
      routes[`/${name}/:id`] = {
        methods: methods.filter((m) =>
          ['get', 'put', 'patch', 'delete'].includes(m)
        ),
        _links: {
          self: `${BASE_URL}/${namespace}/${name}/:id`,
        },
      };
    }
  });
  return res.json({
    name: APP_NAME,
    description: APP_DESC,
    base_url: BASE_URL,
    namespace,
    routes,
    _links: {},
  });
});

export default router;
