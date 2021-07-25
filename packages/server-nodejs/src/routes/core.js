import express from 'express';
import fileUpload from 'express-fileupload';

import tokenAuth from 'middlewares/tokenAuth';

import * as handlers from 'handlers';
import * as resourceHandler from 'handlers/core/resource';
import * as usersHandler from 'handlers/core/users';
import * as configHandler from 'handlers/core/config';
import * as mediaHandler from 'handlers/core/media';
import * as emailHandler from 'handlers/core/email';

const router = express.Router();

router.get('/', handlers.core);

// users
router.get('/users', tokenAuth, usersHandler.get);
router.get('/users/:id', tokenAuth, usersHandler.getSingle);
router.post('/users', tokenAuth, usersHandler.post);
router.patch('/users/:id', tokenAuth, usersHandler.patch);
router.delete('/users/:id', tokenAuth, usersHandler.delete);

// resource
router.get('/resource', tokenAuth, resourceHandler.get);
router.get('/resource/:id', tokenAuth, resourceHandler.getSingle);
router.post('/resource', tokenAuth, resourceHandler.post);
router.put('/resource/:id', tokenAuth, resourceHandler.put);
router.patch('/resource/:id', tokenAuth, resourceHandler.patch);
router.delete('/resource/:id', tokenAuth, resourceHandler.delete);

// media
// TODO: Add tokenAuth middleware
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
router.get('/config', tokenAuth, configHandler.get);
router.get('/config/:type', tokenAuth, configHandler.getByType);
router.post('/config/:type', tokenAuth, configHandler.postByType);
router.patch('/config/:type', tokenAuth, configHandler.patchByType);

// email
router.post('/email', tokenAuth, emailHandler.post);

export default router;
