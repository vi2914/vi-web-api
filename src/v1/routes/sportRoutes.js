import express from 'express';
const router = express.Router();

import { getAll, getById, create, update, deleteSportController } from '../controllers/sportController.js';

import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authenticateToken, authorizeRole('admin'), create);
router.put('/:id', authenticateToken, authorizeRole('admin'), update);
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteSportController);

export default router;