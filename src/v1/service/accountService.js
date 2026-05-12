// Services/accountService.js

import bcrypt from "bcrypt";

import {
    createUser,
    fetchUsers,
    getAccountById,
    fetchUser,
    updateAccount
} from "../Repository/accountRepository.js";

class AccountService {
    async createAccount(data) {
        const { email, username, password, roles = [] } = data;

        if (!email || !username || !password) {
            throw new Error("Email, username, and password are required");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await createUser(
            email,
            username,
            passwordHash,
            roles
        );

        return {
            uuid: result.uuid,
            email,
            username,
            roles
        };
    }

    async getAccounts() {
        return await fetchUsers();
    }

    async getAccount(id) {
        return await getAccountById(id);
    }

    async getAccountByUsername(username) {
        return await fetchUser(username);
    }

    async updateAccount(id, data) {
        const account = await getAccountById(id);

        if (!account) {
            return null;
        }

        await updateAccount(id, data);

        return await getAccountById(id);
    }
}

export default new AccountService();