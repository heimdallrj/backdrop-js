import express from 'express';
import fileUpload from 'express-fileupload';
import forEach from 'lodash/forEach';
import keysIn from 'lodash/keysIn';
import { readdirSync } from 'fs';

import * as handlers from 'handlers';

import { response } from 'utils/http';
import JsonDB, { db } from 'utils/database/jsondb';

import { baseUrl, mediaDir, mediaPath, filesToBeIgnored } from 'config';

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
router.post(
  '/media',
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024, // 2MB max file(s) size
    },
  }),
  async (req, res) => {
    try {
      if (!req.files) {
        response.bad(res);
      } else {
        const { files } = req.files;
        const isSingleFile = !Array.isArray(files);

        if (isSingleFile) {
          files.mv(`${mediaPath}/${files.name}`);
          response.ok(res, [
            {
              name: files.name,
              size: files.size,
              mimetype: files.mimetype,
              md5: files.md5,
              url: `${baseUrl}/${mediaDir}/${files.name}`,
            },
          ]);
        } else {
          const payload = [];

          forEach(keysIn(files), (key) => {
            const file = files[key];
            file.mv(`${mediaPath}/${file.name}`);

            payload.push({
              name: file.name,
              size: file.size,
              mimetype: file.mimetype,
              md5: file.md5,
              url: `${baseUrl}/${mediaDir}/${file.name}`,
            });
          });

          response.ok(res, payload);
        }
      }
    } catch (err) {
      response.internalError(res);
    }
  }
);

router.get('/media', (req, res) => {
  try {
    const files = readdirSync(mediaPath)
      .filter((f) => !filesToBeIgnored.includes(f))
      .map((f) => `${baseUrl}/${mediaDir}/${f}`);
    response.ok(res, files);
  } catch (err) {
    response.internalError(res);
  }
});

// users
router.get('/users', (req, res) => {
  try {
    const users = db.users.find({});
    response.ok(res, users);
  } catch (err) {
    response.internalError(res);
  }
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const userSingle = db.users.findOne({ _id: id });
  response.ok(res, userSingle);
});

router.post('/users', (req, res) => {
  // TODO Validate request body
  const user = req.body;
  const doc = db.users.insert(user);
  response.ok(res, doc);
});

router.patch('/users/:id', (req, res) => {
  // TODO Validate request body
  const { id } = req.params;
  const newDoc = req.body;
  const doc = db.users.updateOne({ _id: id }, newDoc);
  response.ok(res, doc);
});

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  response.ok(res, db.users.remove(id));
});

// config
router.get('/config', (req, res) => {
  try {
    const config = db.config.find({});
    response.ok(res, config);
  } catch (err) {
    response.internalError(res);
  }
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const configSingle = db.config.findOne({ _id: id });
  response.ok(res, configSingle);
});

router.post('/users', (req, res) => {
  // TODO Validate request body
  const config = req.body;
  const doc = db.config.insert(config);
  response.ok(res, doc);
});

router.patch('/users/:id', (req, res) => {
  // TODO Validate request body
  const { id } = req.params;
  const newDoc = req.body;
  const doc = db.config.updateOne({ _id: id }, newDoc);
  response.ok(res, doc);
});

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  response.ok(res, db.config.remove(id));
});

export default router;
