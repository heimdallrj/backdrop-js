import express from 'express';
import fileUpload from 'express-fileupload';
import forEach from 'lodash/forEach';
import keysIn from 'lodash/keysIn';
import { readdirSync } from 'fs';

import { response } from 'utils/http';
import JsonDB, { db } from 'utils/database/jsondb';

import {
  BASE_URL,
  APP_NAME,
  APP_DESC,
  MEDIA_DIR,
  MEDIA_PATH,
  filesToBeIgnored,
} from 'config';

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
      '/media': {
        methods: ['post'],
        _links: {
          self: `${BASE_URL}/${namespace}/media`,
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
          files.mv(`${MEDIA_PATH}/${files.name}`);
          response.success(res, [
            {
              name: files.name,
              size: files.size,
              mimetype: files.mimetype,
              md5: files.md5,
              url: `${BASE_URL}/${MEDIA_DIR}/${files.name}`,
            },
          ]);
        } else {
          const payload = [];

          forEach(keysIn(files), (key) => {
            const file = files[key];
            file.mv(`${MEDIA_PATH}/${file.name}`);

            payload.push({
              name: file.name,
              size: file.size,
              mimetype: file.mimetype,
              md5: file.md5,
              url: `${BASE_URL}/${MEDIA_DIR}/${file.name}`,
            });
          });

          response.success(res, payload);
        }
      }
    } catch (err) {
      response.internalError(res);
    }
  }
);

router.get('/media', (req, res) => {
  try {
    const files = readdirSync(MEDIA_PATH)
      .filter((f) => !filesToBeIgnored.includes(f))
      .map((f) => `${BASE_URL}/${MEDIA_DIR}/${f}`);
    response.success(res, files);
  } catch (err) {
    response.internalError(res);
  }
});

export default router;
