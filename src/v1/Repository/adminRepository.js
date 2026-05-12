import {
    fetchUsers,
    fetchUser,
    deleteUserById
} from "./accountRepository.js";

export async function getAllUsers() {
    return fetchUsers();
}

export async function getUserByUsername(username) {
    return fetchUser(username);
}

export async function removeUserById(userId) {
    return deleteUserById(userId);
}
