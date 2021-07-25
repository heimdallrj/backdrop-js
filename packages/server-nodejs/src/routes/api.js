import express from 'express';

import * as apiMiddlewares from 'middlewares/api';
import * as handlers from 'handlers';
import * as apiHandler from 'handlers/api';

const router = express.Router();

router.get(
  '/:resource/:id',
  [apiMiddlewares.auth, apiMiddlewares.resource],
  apiHandler.getSingle
);
router.get(
  '/:resource/',
  [apiMiddlewares.auth, apiMiddlewares.resource],
  apiHandler.get
);
router.post(
  '/:resource',
  [apiMiddlewares.auth, apiMiddlewares.resource, apiMiddlewares.schema],
  apiHandler.post
);
router.put(
  '/:resource/:id',
  [apiMiddlewares.auth, apiMiddlewares.resource, apiMiddlewares.schema],
  apiHandler.put
);
router.patch(
  '/:resource/:id',
  [apiMiddlewares.auth, apiMiddlewares.resource, apiMiddlewares.schema],
  apiHandler.patch
);
router.delete(
  '/:resource/:id',
  [apiMiddlewares.auth, apiMiddlewares.resource],
  apiHandler.delete
);

router.get('/', handlers.api);

export default router;
