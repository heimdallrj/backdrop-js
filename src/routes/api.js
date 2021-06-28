import express from 'express';

import { validateResource, validateSchema } from 'middlewares';
import * as handlers from 'handlers';

const router = express.Router();

router.get('/:resource/:id', validateResource, handlers.getSingle);
router.get('/:resource/', validateResource, handlers.get);
router.post('/:resource', [validateResource, validateSchema], handlers.post);
router.put('/:resource/:id', [validateResource, validateSchema], handlers.put);
router.patch(
  '/:resource/:id',
  [validateResource, validateSchema],
  handlers.patch
);
router.delete('/:resource/:id', validateResource, handlers.del);
router.get('/', handlers.api);

export default router;
