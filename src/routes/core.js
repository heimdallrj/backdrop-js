import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send('hello world'));

// resource
router.get('/resource', (req, res) => res.send('get resource'));

router.post('/resource', (req, res) => res.send('post resource'));

router.put('/resource', (req, res) => res.send('put resource'));

router.delete('/resource', (req, res) => res.send('delete resource'));

export default router;
