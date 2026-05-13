import { randomUUID } from "crypto";
import { getPool, getConnection } from "../data/db.js";

export async function getSports() {
    const connection = await getConnection();
    const [rows] = await connection.execute(
        'SELECT * FROM Sport ORDER BY Sport_name'
    );
    return rows;
}

export async function getSport(id) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
        'SELECT * FROM Sport WHERE Sport_ID = ?',
        [id]
    );
    return rows[0];
}

export async function createSport(sportName) {
    const id = randomUUID();
    const connection = await getConnection();

    await connection.execute(
        `INSERT INTO Sport (Sport_ID, Sport_name)
         VALUES (?, ?)`,
        [id, sportName]
    );

    const [rows] = await connection.execute(
        'SELECT * FROM Sport WHERE Sport_ID = ?',
        [id]
    );

    return rows[0];
}

export async function updateSport(id, sportName) {
    const connection = await getConnection();

    await connection.execute(
        `UPDATE Sport
         SET Sport_name = ?
         WHERE Sport_ID = ?`,
        [sportName, id]
    );

    const [rows] = await connection.execute(
        'SELECT * FROM Sport WHERE Sport_ID = ?',
        [id]
    );

    return rows[0];
}

export async function deleteSport(id) {
    const connection = await getConnection();
    await connection.execute(
        'DELETE FROM Sport WHERE Sport_ID = ?',
        [id]
    );
    return { message: "Sport deleted successfully" };
}