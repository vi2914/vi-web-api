import { getPool } from "../data/db.js";
import { randomUUID } from "crypto";

export async function getSports() {
    const pool = await getPool();
    const result = await pool.query(
        'SELECT * FROM Sport ORDER BY Sport_name'
    );

    return result.rows;
}

export async function getSport(id) {
    const pool = await getPool();
    const result = await pool.query(
        'SELECT * FROM Sport WHERE Sport_ID = ?',
        [id]
    );

    return result.rows[0];
}

export async function createSport(sportName) {
    const id = randomUUID();

    const pool = await getPool();
    const result = await pool.query(
        `INSERT INTO Sport (Sport_ID, Sport_name)
             VALUES (?, ?)
             RETURNING *`,
        [id, sportName]
    );

    return result.rows[0];
}

export async function updateSport(id, sportName) {
    const pool = await getPool();
    const result = await pool.query(
        `UPDATE Sport
             SET Sport_name = ?
             WHERE Sport_ID = ?
             RETURNING *`,
        [sportName, id]
    );

    return result.rows[0];
}

export async function deleteSport(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Sport WHERE Sport_ID = ?',
        [id]
    );
}