import express from 'express';

import { validateResource, validateSchema } from 'middlewares';
import * as handlers from 'handlers';
import * as apiHandler from 'handlers/api';

const router = express.Router();

router.get('/:resource/:id', validateResource, apiHandler.getSingle);
router.get('/:resource/', validateResource, apiHandler.get);
router.post('/:resource', [validateResource, validateSchema], apiHandler.post);
router.put(
  '/:resource/:id',
  [validateResource, validateSchema],
  apiHandler.put
);
router.patch(
  '/:resource/:id',
  [validateResource, validateSchema],
  apiHandler.patch
);
router.delete('/:resource/:id', validateResource, apiHandler.delete);

router.get('/', handlers.api);

export default router;
