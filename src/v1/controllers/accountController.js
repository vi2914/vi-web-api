// Controllers/accountController.js

import accountService from "../service/accountService.js";

export const createAccount = async (req, res) => {
    try {
        const result = await accountService.createAccount(req.body);

        res.status(201).json(result);
    } catch (error) {
        console.error(error);

        if (error.message.includes("required")) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: "Failed to create account" });
    }
};

export const getAccounts = async (req, res) => {
    try {
        const accounts = await accountService.getAccounts();

        res.status(200).json(accounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch accounts" });
    }
};

export const getAccount = async (req, res) => {
    try {
        const account = await accountService.getAccount(req.params.id);

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
        const account = await accountService.getAccountByUsername(
            req.params.username
        );

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
        const updated = await accountService.updateAccount(
            req.params.id,
            req.body
        );

        if (!updated) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update account" });
    }
};