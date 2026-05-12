import {
    getAllUsers,
    getUserByUsername,
    removeUserById
} from "../Repository/adminRepository.js";


export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUserByUsernameController = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteAccountById = async (req, res) => {
    try {
        const { uuid } = req.params;

        if (!uuid) {
            return res.status(400).json({ error: "UUID required" });
        }

        await removeUserById(uuid);
        res.status(200).json({ message: `User '${uuid}' deleted` });
    } catch (error) {
        console.error(error);
        if (error.message === "User not found") {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteAccountController = async (req, res) => {
    try {
        const { id } = req.params;
        await removeUserById(id);
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        if (error.message === "User not found") {
            return res.status(404).json({ error: "Account not found" });
        }
        res.status(500).json({ error: "Failed to delete account" });
    }
};
