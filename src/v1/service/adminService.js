// Services/adminService.js

import {
    fetchUsers,
    fetchUser,
    deleteUserById
} from "../Repository/accountRepository.js";

class AdminService {
    async getUsers() {
        const users = await fetchUsers();

        if (!users || users.length === 0) {
            return null;
        }

        return users;
    }

    async getUserByUsername(username) {
        return await fetchUser(username);
    }

    async deleteUser(uuid) {
        if (!uuid) {
            throw new Error("UUID required");
        }

        await deleteUserById(uuid);

        return {
            message: `User '${uuid}' deleted`
        };
    }
}

export default new AdminService();