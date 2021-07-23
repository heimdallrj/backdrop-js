import express from 'express';
import fileUpload from 'express-fileupload';

import * as handlers from 'handlers';
import * as usersHandler from 'handlers/core/users';
import * as configHandler from 'handlers/core/config';
import * as mediaHandler from 'handlers/core/media';

import { response } from 'utils/http';
import JsonDB, { db } from 'utils/database/jsondb';

const router = express.Router();

router.get('/', handlers.core);

// resource
router.get('/resource', (req, res) => {
  const resources = db.resources.find({});
  response.ok(res, resources);
});

router.get('/resource/:id', (req, res) => {
  const { id } = req.params;
  const resourceSingle = db.resources.findOne({ _id: id });
  response.ok(res, resourceSingle);
});

router.post('/resource', (req, res) => {
  // TODO Validate request body
  const resource = req.body;
  const doc = db.resources.insert(resource);
  if (doc && doc.type === 'default') {
    JsonDB.createCollection(`_${doc.name}`);
  }
  response.ok(res, doc);
});

router.put('/resource/:id', (req, res) => {
  // TODO Validate request body
  const { id } = req.params;
  const newDoc = req.body;
  const doc = db.resources.updateOne({ _id: id }, newDoc);
  response.ok(res, doc);
});

router.patch('/resource/:id', (req, res) => {
  // TODO Validate request body
  const { id } = req.params;
  const newDoc = req.body;
  const doc = db.resources.updateOne({ _id: id }, newDoc);
  response.ok(res, doc);
});

router.delete('/resource/:id', (req, res) => {
  const { id } = req.params;
  response.ok(res, db.resources.remove(id));
});

// media
router.get('/media', mediaHandler.get);
router.post(
  '/media',
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024, // 2MB max file(s) size
    },
  }),
  mediaHandler.post
);

// config
router.get('/config', configHandler.get);
router.get('/config/init', configHandler.getInit);
router.post('/config/init', configHandler.postInit);

// users
router.get('/users', usersHandler.get);
router.get('/users/:id', usersHandler.getSingle);
router.post('/users', usersHandler.post);
router.patch('/users/:id', usersHandler.patch);
router.delete('/users/:id', usersHandler.delete);

export default router;
