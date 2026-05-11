import { getPool } from "../data/db.js";
import { randomUUID } from "crypto";

export async function createUser(email, username, passwordHash, roles = []) {
    const accountId = randomUUID();
    const credentialId = randomUUID();

    const pool = await getPool();
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        await conn.query(
            `INSERT INTO Account (Account_ID, Email, Username, Created_at, Updated_at)
             VALUES (?, ?, ?, NOW(), NOW());`,
            [accountId, email, username]
        );

        await conn.query(
            `INSERT INTO Auth_Credentials (Auth_ID, Account_ID, Password_hash)
             VALUES (?, ?, ?);`,
            [credentialId, accountId, passwordHash]
        );

        for (const roleName of roles) {
            const [roleRows] = await conn.query(
                `SELECT Role_ID FROM Account_Role WHERE Role_name = ?`,
                [roleName]
            );

            let roleId;

            if (roleRows.length === 0) {
                roleId = randomUUID();
                await conn.query(
                    `INSERT INTO Account_Role (Role_ID, Role_name)
                     VALUES (?, ?);`,
                    [roleId, roleName]
                );
            } else {
                roleId = roleRows[0].Role_ID;
            }

            await conn.query(
                `INSERT INTO Account_Assigned_Role (Account_ID, Role_ID, Assigned_at)
                 VALUES (?, ?, NOW());`,
                [accountId, roleId]
            );
        }

        await conn.commit();
        return { uuid: accountId };
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

export async function fetchUser(username) {
    const pool = await getPool();

    try {
        const [rows] = await pool.query(
            `SELECT 
                a.Account_ID AS uuid,
                a.Email AS email,
                a.Username AS username,
                ac.Password_hash AS password_hash,
                a.Created_at AS created_at,
                a.Updated_at AS updated_at,
                COALESCE(GROUP_CONCAT(DISTINCT r.Role_name), '') AS roles
             FROM Account a
             LEFT JOIN Auth_Credentials ac ON ac.Account_ID = a.Account_ID
             LEFT JOIN Account_Assigned_Role aar ON aar.Account_ID = a.Account_ID
             LEFT JOIN Account_Role r ON r.Role_ID = aar.Role_ID
             WHERE a.Username = ?
             GROUP BY 
                a.Account_ID,
                a.Email,
                a.Username,
                ac.Password_hash,
                a.Created_at,
                a.Updated_at;`,
            [username]
        );

        const user = rows[0];
        if (!user) return null;

        return {
            uuid: user.uuid,
            email: user.email,
            username: user.username,
            passwordHash: user.password_hash,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
            roles: user.roles ? user.roles.split(",") : []
        };
    } catch (error) {
        throw error;
    }
}

export async function getAccountById(accountId) {
    const pool = await getPool();

    try {
        const [rows] = await pool.query(
            `SELECT 
                a.Account_ID AS uuid,
                a.Email AS email,
                a.Username AS username,
                a.Created_at AS created_at,
                a.Updated_at AS updated_at,
                COALESCE(GROUP_CONCAT(DISTINCT r.Role_name), '') AS roles
             FROM Account a
             LEFT JOIN Account_Assigned_Role aar ON aar.Account_ID = a.Account_ID
             LEFT JOIN Account_Role r ON r.Role_ID = aar.Role_ID
             WHERE a.Account_ID = ?
             GROUP BY 
                a.Account_ID,
                a.Email,
                a.Username,
                a.Created_at,
                a.Updated_at;`,
            [accountId]
        );

        const account = rows[0];
        if (!account) return null;

        return {
            uuid: account.uuid,
            email: account.email,
            username: account.username,
            createdAt: account.created_at,
            updatedAt: account.updated_at,
            roles: account.roles ? account.roles.split(",") : []
        };
    } catch (error) {
        throw error;
    }
}

export async function updateAccount(accountId, account) {
    const pool = await getPool();
    const { email, username } = account;

    try {
        await pool.query(
            `UPDATE Account
             SET Email = ?, Username = ?, Updated_at = NOW()
             WHERE Account_ID = ?;`,
            [email, username, accountId]
        );
    } catch (error) {
        throw error;
    }
}

export async function deleteUserById(userId) {
    const pool = await getPool();
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        await conn.query(
            `DELETE FROM Account_Assigned_Role WHERE Account_ID = ?`,
            [userId]
        );

        await conn.query(
            `DELETE FROM Auth_Credentials WHERE Account_ID = ?`,
            [userId]
        );

        await conn.query(
            `DELETE FROM Account WHERE Account_ID = ?`,
            [userId]
        );

        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

export async function fetchUsers() {
    const pool = await getPool();

    try {
        const [rows] = await pool.query(
            `SELECT 
                a.Account_ID AS uuid,
                a.Email AS email,
                a.Username AS username,
                a.Created_at AS created_at,
                a.Updated_at AS updated_at,
                COALESCE(GROUP_CONCAT(DISTINCT r.Role_name), '') AS roles
             FROM Account a
             LEFT JOIN Account_Assigned_Role aar ON aar.Account_ID = a.Account_ID
             LEFT JOIN Account_Role r ON r.Role_ID = aar.Role_ID
             GROUP BY 
                a.Account_ID,
                a.Email,
                a.Username,
                a.Created_at,
                a.Updated_at;`
        );

        return rows.map(u => ({
            uuid: u.uuid,
            email: u.email,
            username: u.username,
            createdAt: u.created_at,
            updatedAt: u.updated_at,
            roles: u.roles ? u.roles.split(",") : []
        }));
    } catch (error) {
        throw error;
    }
}

export async function deleteUserByUsername(username) {
    const pool = await getPool();
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        const [rows] = await conn.query(
            `SELECT Account_ID FROM Account WHERE Username = ?`,
            [username]
        );

        if (rows.length === 0) {
            throw new Error("User not found");
        }

        const userId = rows[0].Account_ID;

        await conn.query(
            `DELETE FROM Account_Assigned_Role WHERE Account_ID = ?`,
            [userId]
        );

        await conn.query(
            `DELETE FROM Auth_Credentials WHERE Account_ID = ?`,
            [userId]
        );

        await conn.query(
            `DELETE FROM Account WHERE Account_ID = ?`,
            [userId]
        );

        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

export async function deleteUserByUsername(username) {
    const pool = await getPool();
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        const [rows] = await conn.query(
            `SELECT Account_ID FROM Account WHERE Username = ?`,
            [username]
        );

        if (rows.length === 0) {
            throw new Error("User not found");
        }

        const userId = rows[0].Account_ID;

        await conn.query(
            `DELETE FROM Account_Assigned_Role WHERE Account_ID = ?`,
            [userId]
        );

        await conn.query(
            `DELETE FROM Auth_Credentials WHERE Account_ID = ?`,
            [userId]
        );

        await conn.query(
            `DELETE FROM Account WHERE Account_ID = ?`,
            [userId]
        );

        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}