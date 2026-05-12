import { createUser as createAccountUser, fetchUser as fetchAccountUser } from "./accountRepository.js";

export async function registerAccount(email, username, passwordHash, roles = []) {
    return createAccountUser(email, username, passwordHash, roles);
}

export async function fetchUserByUsername(username) {
    return fetchAccountUser(username);
}
