import express from 'express';
import uniqid from 'uniqid';
import { response } from 'utils/http';
import * as jsonDb from 'utils/database/jsonDb';

const router = express.Router();

router.get('/', (req, res) => res.send('hello world'));

// resource
router.get('/resource', (req, res) => {
  const resourcesColl = jsonDb.get('resources');
  response.success(res, resourcesColl);
});

router.get('/resource/:id', (req, res) => {
  const { id } = req.params;
  const resourcesColl = jsonDb.get('resources');
  const resourceSingle = resourcesColl.find(({ _id }) => _id === id);
  response.success(res, resourceSingle);
});

router.post('/resource', (req, res) => {
  const resource = {
    _id: uniqid(),
    ...req.body,
  };
  const resourcesColl = jsonDb.get('resources');
  resourcesColl.push(resource);
  jsonDb.set('resources', resourcesColl);
  response.success(res, resourcesColl);
});

router.put('/resource/:id', (req, res) => {
  const { id } = req.params;
  const resource = req.body;
  const resourcesColl = jsonDb.get('resources');
  const resourcesCollModified = resourcesColl.filter(({ _id }) => _id !== id);
  resourcesCollModified.push(resource);
  jsonDb.set('resources', resourcesCollModified);
  response.success(res, resourcesCollModified);
});

router.patch('/resource/:id', (req, res) => {
  const { id } = req.params;
  const resourcePartial = req.body;
  const resourcesColl = jsonDb.get('resources');
  const resourceSingle = resourcesColl.find(({ _id }) => _id === id);
  const resource = {
    ...resourceSingle,
    ...resourcePartial,
  };
  const resourcesCollModified = resourcesColl.filter(({ _id }) => _id !== id);
  resourcesCollModified.push(resource);
  jsonDb.set('resources', resourcesCollModified);
  response.success(res, resourcesCollModified);
});

router.delete('/resource/:id', (req, res) => {
  const { id } = req.params;
  const resourcesColl = jsonDb.get('resources');
  const resourcesCollModified = resourcesColl.filter(({ _id }) => _id !== id);
  jsonDb.set('resources', resourcesCollModified);
  response.success(res);
});

export default router;
