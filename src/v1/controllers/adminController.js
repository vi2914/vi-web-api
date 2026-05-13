// Controllers/adminController.js

import adminService from "../service/adminService.js";

export const getUsers = async (req, res) => {
    try {
        const users = await adminService.getUsers();

        if (!users) {
            return res.status(404).json({
                error: "No users found"
            });
        }

        res.status(200).json(users);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const getUserByUsernameController = async (req, res) => {
    try {
        const user = await adminService.getUserByUsername(
            req.params.username
        );

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const deleteAccountById = async (req, res) => {
    try {
        const result = await adminService.deleteUser(
            req.params.uuid
        );

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        if (error.message === "UUID required") {
            return res.status(400).json({
                error: error.message
            });
        }

        if (error.message === "User not found") {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const result = await adminService.register(
            req.body
        );
        res.status(201).json(result);

    } catch (error) {
        console.error(error);
        if (error.message.includes("required")) {
            return res.status(400).json({
                error: error.message
            });
        }
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};