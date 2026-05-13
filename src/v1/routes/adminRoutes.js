import express from "express";

import {
    getUsers,
    getUserByUsernameController,
    deleteAccountById,
    createUser
} from "../controllers/adminController.js";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET | localhost:3868/api/v1/admin/users
router.get('/users', authenticateToken, authorizeRole('admin'), getUsers);

// GET | localhost:3868/api/v1/admin/user/:username
router.get('/user/:username', authenticateToken, authorizeRole('admin'), getUserByUsernameController);

// DELETE | localhost:3868/api/v1/admin/user/:uuid
router.delete('/user/:uuid', authenticateToken, authorizeRole('admin'), deleteAccountById);

// POST | localhost:3868/api/v1/admin/user
router.post('/user', authenticateToken, authorizeRole('admin'), createUser);

export default router;
