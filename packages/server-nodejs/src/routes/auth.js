import express from 'express';

import * as authHandler from 'handlers/auth';

const router = express.Router();

router.post('/user', authHandler.user.post);

export default router;
