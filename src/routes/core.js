import express from 'express';
import * as jsonDb from 'utils/database/jsonDb';

const router = express.Router();

router.get('/', (req, res) => res.send('hello world'));

// resource
router.get('/resource', (req, res) => res.send('get resource'));

router.post('/resource', (req, res) => {
  const resourcesColl = jsonDb.get('resources');
  resourcesColl.push(req.body);
  jsonDb.set('resources', resourcesColl);
  res.json(resourcesColl);
});

router.put('/resource', (req, res) => res.send('put resource'));

router.delete('/resource', (req, res) => res.send('delete resource'));

export default router;
