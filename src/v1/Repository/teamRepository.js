import { randomUUID } from "crypto";
import { getPool } from "../data/db.js";

export async function getTeams() {
    const pool = await getPool();
    const result = await pool.query(
        'SELECT * FROM Team ORDER BY Team_name'
    );
    return result.rows;
}

export async function getTeam(id) {
    const pool = await getPool();
    const result = await pool.query(
        'SELECT * FROM Team WHERE Team_ID = ?',
        [id]
    );
    return result.rows[0];
}

export async function createTeam(teamName, managerId, sportId, ageGroupId) {
    const id = randomUUID();
    const pool = await getPool();
    const result = await pool.query(
        `INSERT INTO Team (Team_ID, Team_name, Manager_ID, Sport_ID, Age_Group_ID)
             VALUES (?, ?, ?, ?, ?)
             RETURNING *`,
        [id, teamName, managerId, sportId, ageGroupId]
    );
    return result.rows[0];
}

export async function updateTeam(id, teamName, managerId, sportId, ageGroupId) {
    const pool = await getPool();
    const result = await pool.query(
        `UPDATE Team
             SET Team_name = ?, Manager_ID = ?, Sport_ID = ?, Age_Group_ID = ?
             WHERE Team_ID = ?
             RETURNING *`,
        [teamName, managerId, sportId, ageGroupId, id]
    );
    return result.rows[0];
}

export async function deleteTeam(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Team WHERE Team_ID = ?',
        [id]
    );
}

export async function getTeamsBySport(sportId) {
    const pool = await getPool();
    const result = await pool.query(
        `SELECT t.*
         FROM Team t
         JOIN Sport_Team st ON t.Team_ID = st.Team_ID
            WHERE st.Sport_ID = ?
            ORDER BY t.Team_name`,
        [sportId]
    );
    return result.rows;
}

export async function addPlayerToTeam(teamId, playerId) {
    const pool = await getPool();
    try {
        await pool.query(
            `INSERT INTO Team_Player (Team_ID, Player_ID)
             VALUES (?, ?)`,
            [teamId, playerId]
        );
    } catch (error) {
        throw error;
    }
}

export async function removePlayerFromTeam(teamId, playerId) {
    const pool = await getPool();
    try {
        await pool.query(
            `DELETE FROM Team_Player
             WHERE Team_ID = ? AND Player_ID = ?`,
            [teamId, playerId]
        );
    } catch (error) {
        throw error;
    }
}

export async function getPlayersInTeam(teamId) {
    const pool = await getPool();
    try {
        const result = await pool.query(
            `SELECT p.*
             FROM Player p
             JOIN Team_Player tp ON p.Player_ID = tp.Player_ID
             WHERE tp.Team_ID = ?`,
            [teamId]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
}

export async function createTeamWithPlayers(teamName, playerIds) {
    const pool = await getPool();
    const teamId = randomUUID();
    const conn = await pool.connect();

    try {
        await conn.query('BEGIN');
        await conn.query(
            `INSERT INTO Team (Team_ID, Team_name, Sport_ID, Age_Group_ID)
             VALUES (?, ?, ?, ?)`,
            [teamId, teamName, sportId, ageGroupId]
        );
        for (const playerId of playerIds) {
            await conn.query(
                `INSERT INTO Team_Player (Team_ID, Player_ID)
                 VALUES (?, ?)`,
                [teamId, playerId]
            );
        }
        await conn.query('COMMIT');
        return { teamId };
    } catch (error) {
        await conn.query('ROLLBACK');
        throw error;
    } finally {
        conn.release();
    }
}

export async function createPlayer(firstName, lastName, playerNumber, teamId) {
    const playerUUID = randomUUID();
    const pool = await getPool();
    const result = await pool.query(
        `INSERT INTO Player (Player_ID, First_name, Last_name, Player_number)
         VALUES (?, ?, ?, ?)
         RETURNING *`,
        [playerUUID, firstName, lastName, playerNumber]
    );
    return result.rows[0];
}

export async function addTeamManager(teamId, accountId) {
    const pool = await getPool();
    try {
        await pool.query(
            `INSERT INTO Team_Manager (Team_ID, Account_ID)
             VALUES (?, ?)`,
            [teamId, accountId]
        );
    } catch (error) {
        throw error;
    }
}

export async function removeTeamManager(teamId, accountId) {
    const pool = await getPool();
    try {        await pool.query(
            `DELETE FROM Team_Manager
             WHERE Team_ID = ? AND Account_ID = ?`,
            [teamId, accountId]
        );
    } catch (error) {
        throw error;
    }
}

export async function getTeamManagers(teamId) {
    const pool = await getPool();
    try {
        const result = await pool.query(
            `SELECT a.*
             FROM Account a
             JOIN Team_Manager tm ON a.Account_ID = tm.Account_ID
                WHERE tm.Team_ID = ?`,
            [teamId]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
}