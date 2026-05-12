import express from "express";
import {
    createAccount,
    getAccounts,
    getAccount,
    getAccountByUsername,
    updateAccountController
} from "../controllers/accountController.js";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST | localhost:3868/api/v1/accounts
router.post('/', authenticateToken, authorizeRole('management', 'admin'), createAccount);

// GET | localhost:3868/api/v1/accounts
router.get('/', authenticateToken, authorizeRole('management', 'admin'), getAccounts);

// GET | localhost:3868/api/v1/accounts/username/:username
router.get('/username/:username', authenticateToken, authorizeRole('management', 'admin'), getAccountByUsername);

// GET | localhost:3868/api/v1/accounts/:id
router.get('/:id', authenticateToken, authorizeRole('management', 'admin'), getAccount);

// PUT | localhost:3868/api/v1/accounts/:id
router.put('/:id', authenticateToken, authorizeRole('management', 'admin'), updateAccountController);

export default router;
