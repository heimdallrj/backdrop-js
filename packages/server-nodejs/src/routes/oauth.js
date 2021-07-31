import express from 'express';
import axios from 'axios';

import { db } from 'database';
import { oAuthGitHubClientId, oAuthGitHubClientSecret } from 'config';

const router = express.Router();

const getOAuthResponse = async ({ code }) => {
  const response = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${oAuthGitHubClientId}&client_secret=${oAuthGitHubClientSecret}&code=${code}`,
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

router.get('/github', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${oAuthGitHubClientId}`
  );
});

router.get('/github/callback', async (req, res) => {
  const { code } = req.query;
  const response = await getOAuthResponse({ code });

  const oAuthConfig = db().config.find({ type: 'oauth', provider: 'github' });

  if (!oAuthConfig || oAuthConfig.length === 0) {
    db().config.insert({
      type: 'oauth',
      provider: 'github',
      ...response,
    });
  } else {
    db().config.updateOne({ type: 'oauth', provider: 'github' }, response);
  }

  res.redirect('/');
});

export default router;
