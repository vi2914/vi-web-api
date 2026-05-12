// Services/authService.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createUser as createAccountUser, fetchUser as fetchAccountUser } from "../Repository/accountRepository.js";


class AuthService {
    async register(data) {
        const { email, username, password, roles = [] } = data;

        if (!email || !username || !password) {
            throw new Error("Email, username, and password are required");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await createAccountUser(
            email,
            username,
            hashedPassword,
            roles
        );

        return {
            uuid: result.uuid,
            email,
            username,
            roles
        };
    }

    async login(data) {
        const SECRET_KEY = process.env.JWT_SECRET;

        const { username, password } = data;

        if (!username || !password) {
            throw new Error("Username and password are required");
        }

        const user = await fetchAccountUser(username);

        if (!user) {
            throw new Error("Invalid username or password");
        }

        const validPassword =
            user.passwordHash &&
            (await bcrypt.compare(password, user.passwordHash));

        if (!validPassword) {
            throw new Error("Invalid username or password");
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

        return {
            message: "Logged in",
            username: user.username,
            roles: user.roles,
            uuid: user.uuid,
            token
        };
    }
}

export default new AuthService();