import express from 'express';
import fileUpload from 'express-fileupload';

import * as coreMiddlewares from 'middlewares/core';

import * as handlers from 'handlers';
import * as resourceHandler from 'handlers/core/resource';
import * as usersHandler from 'handlers/core/users';
import * as configHandler from 'handlers/core/config';
import * as mediaHandler from 'handlers/core/media';
import * as emailHandler from 'handlers/core/email';

const router = express.Router();

router.get('/', handlers.core);

// users
router.get('/users', coreMiddlewares.auth, usersHandler.get);
router.get('/users/:id', coreMiddlewares.auth, usersHandler.getSingle);
router.post('/users', usersHandler.post);
router.patch('/users/:id', coreMiddlewares.auth, usersHandler.patch);
router.delete('/users/:id', coreMiddlewares.auth, usersHandler.delete);

// resource
router.get('/resource', coreMiddlewares.auth, resourceHandler.get);
router.get('/resource/:name', coreMiddlewares.auth, resourceHandler.getSingle);
router.post('/resource', coreMiddlewares.auth, resourceHandler.post);
router.put('/resource/:name', coreMiddlewares.auth, resourceHandler.put);
router.patch('/resource/:name', coreMiddlewares.auth, resourceHandler.patch);
router.delete('/resource/:name', coreMiddlewares.auth, resourceHandler.delete);

// media
// TODO: Add coreMiddlewares.auth middleware
router.get('/media', coreMiddlewares.auth, mediaHandler.get);
router.post(
  '/media',
  [
    coreMiddlewares.auth,
    fileUpload({
      createParentPath: true,
      limits: {
        fileSize: 2 * 1024 * 1024 * 1024, // 2MB max file(s) size
      },
    }),
  ],
  mediaHandler.post
);

// config
router.get('/config', coreMiddlewares.auth, configHandler.get);
router.get('/config/:type', coreMiddlewares.auth, configHandler.getByType);
router.post('/config/:type', coreMiddlewares.auth, configHandler.postByType);
router.patch('/config/:type', coreMiddlewares.auth, configHandler.patchByType);

// email
router.post('/email', coreMiddlewares.auth, emailHandler.post);

export default router;
