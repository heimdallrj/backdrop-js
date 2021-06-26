import express from 'express';
import { response } from 'utils/http';
import JsonDB, { db } from 'utils/database/jsondb';

const router = express.Router();

router.get('/', (req, res) => response.success(res));

// resource
router.get('/resource', (req, res) => {
  const resources = db.resources.find({});
  response.success(res, resources);
});

router.get('/resource/:id', (req, res) => {
  const { id } = req.params;
  const resourceSingle = db.resources.findOneById(id);
  response.success(res, resourceSingle);
});

router.post('/resource', (req, res) => {
  // TODO Validate request body
  // TODO Create a collection
  const doc = req.body;
  const resource = db.resources.insert(doc);
  if (resource && !doc.type === 'proxy') {
    JsonDB.createCollection(`_${doc.name}`);
  }
  response.success(res, resource);
});

router.put('/resource/:id', (req, res) => {
  // TODO Validate request body
  const { id } = req.params;
  const resource = req.body;
  const doc = db.resources.updateOneById(id, resource, true);
  response.success(res, doc);
});

router.patch('/resource/:id', (req, res) => {
  // TODO Validate request body
  const { id } = req.params;
  const resource = req.body;
  const doc = db.resources.updateOneById(id, resource);
  response.success(res, doc);
});

router.delete('/resource/:id', (req, res) => {
  const { id } = req.params;
  response.success(res, db.resources.remove(id));
});

export default router;
