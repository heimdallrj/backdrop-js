import express from 'express';

import { response } from 'utils/http';
import JsonDB, { db } from 'utils/database/jsondb';

import { BASE_URL, APP_NAME, APP_DESC } from 'config';

const router = express.Router();

const namespace = 'core';

router.get('/', (req, res) =>
  res.json({
    name: APP_NAME,
    description: APP_DESC,
    base_url: BASE_URL,
    namespace,
    routes: {
      // TODO Auto generate routes
      '/resource': {
        methods: ['get', 'post'],
        _links: {
          self: `${BASE_URL}/${namespace}/resource`,
        },
      },
      '/resource/:id': {
        methods: ['get', 'put', 'patch', 'delete'],
        _links: {
          self: `${BASE_URL}/${namespace}/resource/:id`,
        },
      },
    },
    _links: {},
  })
);

// resource
router.get('/resource', (req, res) => {
  const resources = db.resources.find({});
  response.success(res, resources);
});

router.get('/resource/:id', (req, res) => {
  const { id } = req.params;
  const resourceSingle = db.resources.findOne({ _id: id });
  response.success(res, resourceSingle);
});

router.post('/resource', (req, res) => {
  // TODO Validate request body
  const resource = req.body;
  const doc = db.resources.insert(resource);
  if (doc && doc.type === 'default') {
    JsonDB.createCollection(`_${doc.name}`);
  }
  response.success(res, doc);
});

router.put('/resource/:id', (req, res) => {
  // TODO Validate request body
  const { id } = req.params;
  const newDoc = req.body;
  const doc = db.resources.updateOne({ _id: id }, newDoc);
  response.success(res, doc);
});

router.patch('/resource/:id', (req, res) => {
  // TODO Validate request body
  const { id } = req.params;
  const newDoc = req.body;
  const doc = db.resources.updateOne({ _id: id }, newDoc);
  response.success(res, doc);
});

router.delete('/resource/:id', (req, res) => {
  const { id } = req.params;
  response.success(res, db.resources.remove(id));
});

export default router;
