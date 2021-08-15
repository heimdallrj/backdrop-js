import express from 'express';

import * as authHandler from 'handlers/auth';

const router = express.Router();

router.get('/user', authHandler.user.get);
router.post('/user', authHandler.user.post);
router.post('/user/reset-password', authHandler.user.resetPassword);

export default router;
