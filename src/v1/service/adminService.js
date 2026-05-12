// Services/adminService.js

import {
    getAllUsers,
    getUserByUsername,
    removeUserById
} from "../Repository/adminRepository.js";

class AdminService {
    async getUsers() {
        const users = await getAllUsers();

        if (!users || users.length === 0) {
            return null;
        }

        return users;
    }

    async getUserByUsername(username) {
        return await getUserByUsername(username);
    }

    async deleteUser(uuid) {
        if (!uuid) {
            throw new Error("UUID required");
        }

        await removeUserById(uuid);

        return {
            message: `User '${uuid}' deleted`
        };
    }
}

export default new AdminService();