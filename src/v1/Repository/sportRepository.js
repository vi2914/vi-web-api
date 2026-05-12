import { randomUUID } from "crypto";
import { getPool } from "../data/db.js";

export async function getSports() {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT * FROM Sport ORDER BY Sport_name'
    );
    return rows;
}

export async function getSport(id) {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT * FROM Sport WHERE Sport_ID = ?',
        [id]
    );
    return rows[0];
}

export async function createSport(sportName) {
    const id = randomUUID();
    const pool = await getPool();

    await pool.query(
        `INSERT INTO Sport (Sport_ID, Sport_name)
         VALUES (?, ?)`,
        [id, sportName]
    );

    const [rows] = await pool.query(
        'SELECT * FROM Sport WHERE Sport_ID = ?',
        [id]
    );

    return rows[0];
}

export async function updateSport(id, sportName) {
    const pool = await getPool();

    await pool.query(
        `UPDATE Sport
         SET Sport_name = ?
         WHERE Sport_ID = ?`,
        [sportName, id]
    );

    const [rows] = await pool.query(
        'SELECT * FROM Sport WHERE Sport_ID = ?',
        [id]
    );

    return rows[0];
}

export async function deleteSport(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Sport WHERE Sport_ID = ?',
        [id]
    );
}