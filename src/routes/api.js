import express from 'express';

import { db } from 'utils/database/jsondb';
import { proxy } from 'utils/handler';
import { response } from 'utils/http';

import { BASE_URL, APP_NAME, APP_DESC } from 'config';

const namespace = 'api';

const router = express.Router();

router.get('/:resource/:id', (req, res) => {
  // TODO Validate with schema
  // TODO Move below logic to a middleware
  const { resource: name, id: _id } = req.params;
  const resourceDoc = db.resources.findOne({
    name,
    namespace,
    status: 'published',
  });
  if (!resourceDoc) return response.notFound(res);

  const collName = `_${resourceDoc.name}`;
  const doc = db[collName].findOne({ _id });
  if (!doc) return response.notFound(res);

  return response.ok(res, doc);
});

router.get('/:resource/', (req, res) => {
  // TODO Validate with schema
  // TODO Move below logic to a middleware
  const { resource: name } = req.params;
  const resourceDoc = db.resources.findOne({
    name,
    namespace,
    status: 'published',
  });
  if (!resourceDoc) return response.notFound(res);

  if (resourceDoc.type === 'proxy') {
    return proxy(resourceDoc, req, res);
  }

  const collName = `_${resourceDoc.name}`;
  const docs = db[collName].find();
  return response.ok(res, docs);
});

router.post('/:resource', (req, res) => {
  // TODO: Validate with schema
  // TODO Move below logic to a middleware
  const { resource: name } = req.params;
  const resourceDoc = db.resources.findOne({
    name,
    namespace,
    status: 'published',
  });
  if (!resourceDoc) return response.notFound(res);

  const newDoc = req.body;
  const collName = `_${resourceDoc.name}`;
  const doc = db[collName].insert(newDoc);
  return res.json(doc);
});

router.put('/:resource/:id', (req, res) => {
  // TODO: Validate with schema
  // TODO Move below logic to a middleware
  const { resource: name, id: _id } = req.params;
  const resourceDoc = db.resources.findOne({
    name,
    namespace,
    status: 'published',
  });
  if (!resourceDoc) return response.notFound(res);

  const collName = `_${resourceDoc.name}`;
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

router.patch('/:resource/:id', (req, res) => {
  // TODO: Validate with schema
  // TODO Move below logic to a middleware
  const { resource: name, id: _id } = req.params;
  const resourceDoc = db.resources.findOne({
    name,
    namespace,
    status: 'published',
  });
  if (!resourceDoc) return response.notFound(res);

  const collName = `_${resourceDoc.name}`;
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
});

router.delete('/:resource/:id', (req, res) => {
  // TODO: Validate with schema
  // TODO Move below logic to a middleware
  const { resource: name, id: _id } = req.params;
  const resourceDoc = db.resources.findOne({
    name,
    namespace,
    status: 'published',
  });
  if (!resourceDoc) return response.notFound(res);

  const collName = `_${resourceDoc.name}`;
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
