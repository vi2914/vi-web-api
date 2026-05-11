import express from "express";

import {
    getUsers,
    getUserByUsername,
    deleteAccountById,
    deleteAccount
} from "../controllers/authController.js";
import { deleteAccountController } from "../controllers/newUserController.js";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET | localhost:3868/api/v1/admin/users
router.get('/users', authenticateToken, authorizeRole('admin'), getUsers);

// GET | localhost:3868/api/v1/admin/user/:username
router.get('/user/:username', authenticateToken, authorizeRole('admin'), getUserByUsername);

// DELETE | localhost:3868/api/v1/admin/user/:uuid
router.delete('/user/:uuid', authenticateToken, authorizeRole('admin'), deleteAccountById);

// DELETE | localhost:3868/api/v1/admin/delete
router.delete('/delete', authenticateToken, authorizeRole('admin'), deleteAccount);

// DELETE | localhost:3868/api/v1/admin/accounts/:id
router.delete('/accounts/:id', authenticateToken, authorizeRole('admin'), deleteAccountController);

export default router;
