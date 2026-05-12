import { randomUUID } from "crypto";
import { getPool } from "../data/db.js";

export async function getReferees() {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT * FROM Referee ORDER BY Referee_name'
    );
    return rows;
}

export async function getReferee(id) {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT * FROM Referee WHERE Referee_ID = ?',
        [id]
    );
    return rows[0];
}

export async function createReferee(refereeName) {
    const id = randomUUID();
    const pool = await getPool();
    await pool.query(
        `INSERT INTO Referee (Referee_ID, Referee_name)
         VALUES (?, ?)`,
        [id, refereeName]
    );
}

export async function updateReferee(id, refereeName) {
    const pool = await getPool();
    await pool.query(
        `UPDATE Referee
         SET Referee_name = ?
         WHERE Referee_ID = ?`,
        [refereeName, id]
    );
}

export async function deleteReferee(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Referee WHERE Referee_ID = ?',
        [id]
    );
}