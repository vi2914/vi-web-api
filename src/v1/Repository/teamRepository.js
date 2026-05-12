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
        'SELECT * FROM Team WHERE Team_ID = $1',
        [id]
    );
    return result.rows[0];
}

export async function createTeam(teamName) {
    const id = randomUUID();
    const pool = await getPool();
    const result = await pool.query(
        `INSERT INTO Team (Team_ID, Team_name)
             VALUES ($1, $2)
             RETURNING *`,
        [id, teamName]
    );
    return result.rows[0];
}

export async function updateTeam(id, teamName) {
    const pool = await getPool();
    const result = await pool.query(
        `UPDATE Team
             SET Team_name = $1
             WHERE Team_ID = $2
             RETURNING *`,
        [teamName, id]
    );
    return result.rows[0];
}

export async function deleteTeam(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Team WHERE Team_ID = $1',
        [id]
    );
}