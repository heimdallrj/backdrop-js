import express from 'express';
import fileUpload from 'express-fileupload';

import * as handlers from 'handlers';
import * as resourceHandler from 'handlers/core/resource';
import * as usersHandler from 'handlers/core/users';
import * as configHandler from 'handlers/core/config';
import * as mediaHandler from 'handlers/core/media';

const router = express.Router();

router.get('/', handlers.core);

// resource
router.get('/resource', resourceHandler.get);
router.get('/resource/:id', resourceHandler.getSingle);
router.post('/resource', resourceHandler.post);
router.put('/resource/:id', resourceHandler.put);
router.patch('/resource/:id', resourceHandler.patch);
router.delete('/resource/:id', resourceHandler.delete);

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
