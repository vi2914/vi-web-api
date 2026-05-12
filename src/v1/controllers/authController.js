import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerAccount, fetchUserByUsername } from "../Repository/authRepository.js";

export const register = async (req, res) => {
    try {
        const { email, username, password, roles = [] } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await registerAccount(email, username, hashedPassword, roles);

        res.status(201).json({
            uuid: result.uuid,
            email,
            username,
            roles
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const SECRET_KEY = process.env.JWT_SECRET;

    try {
        const { username, password } = req.body;

        const user = await fetchUserByUsername(username);

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        if (
            !user.passwordHash ||
            !(await bcrypt.compare(password, user.passwordHash))
        ) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign(
            {
                uuid: user.uuid,
                username: user.username,
                roles: user.roles
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Logged in",
            username: user.username,
            roles: user.roles,
            uuid: user.uuid,
            token: token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

