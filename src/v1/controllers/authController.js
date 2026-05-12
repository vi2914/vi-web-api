// Controllers/authController.js

import authService from "../service/authService.js";

export const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.status(201).json(result);

    } catch (err) {
        console.error(err);

        if (err.message.includes("required")) {
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        return res.status(200).json(result);

    } catch (err) {
        console.error(err);

        if (
            err.message === "Invalid username or password"
        ) {
            return res.status(401).json({
                error: err.message
            });
        }

        if (err.message.includes("required")) {
            return res.status(400).json({
                error: err.message
            });
        }

        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};