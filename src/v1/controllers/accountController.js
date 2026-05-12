import bcrypt from "bcrypt";
import {
    createUser,
    fetchUsers,
    getAccountById,
    fetchUser,
    updateAccount
} from "../Repository/accountRepository.js";

export const createAccount = async (req, res) => {
    try {
        const { email, username, password, roles = [] } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ error: "Email, username, and password are required" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const result = await createUser(email, username, passwordHash, roles);
        res.status(201).json({ uuid: result.uuid, email, username, roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create account" });
    }
};

export const getAccounts = async (req, res) => {
    try {
        const accounts = await fetchUsers();
        res.status(200).json(accounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch accounts" });
    }
};

export const getAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await getAccountById(id);

        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.status(200).json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch account" });
    }
};

export const getAccountByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const account = await fetchUser(username);

        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.status(200).json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch account" });
    }
};

export const updateAccountController = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await getAccountById(id);

        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }

        await updateAccount(id, req.body);
        const updated = await getAccountById(id);
        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update account" });
    }
};
