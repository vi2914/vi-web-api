import express from 'express';
const router = express.Router();

import { getAll, getById, create, update, deleteSportController } from '../controllers/sportController.js';

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteSportController);

export default router;