import { getReferees, getRefereeById, createReferee, updateReferee, deleteReferee } from "../controllers/refereeController.js";

import express from "express";

const router = express.Router();
import {
    authenticateToken,
    authorizeRole
} from "../middleware/authMiddleware.js";

// GET | localhost:3868/api/v1/referees
router.get('/', authenticateToken, authorizeRole('management', 'admin'), getReferees);

// GET | localhost:3868/api/v1/referees/:id
router.get('/:id', authenticateToken, authorizeRole('management', 'admin'), getRefereeById);

// POST | localhost:3868/api/v1/referees
router.post('/', authenticateToken, authorizeRole('admin'), createReferee);

// PUT | localhost:3868/api/v1/referees/:id
router.put('/:id', authenticateToken, authorizeRole('admin'), updateReferee);

// DELETE | localhost:3868/api/v1/referees/:id
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteReferee);

export default router;