import { randomUUID } from "crypto";
import { getPool } from "../data/db.js";

/* ---------------- AGE GROUP ---------------- */

export async function createAgeGroup(ageGroupName) {
    const id = randomUUID();
    const pool = await getPool();

    await pool.query(
        `INSERT INTO Age_Group (Age_group_ID, Group_name)
         VALUES (?, ?)`,
        [id, ageGroupName]
    );

    const [rows] = await pool.query(
        `SELECT * FROM Age_Group WHERE Age_group_ID = ?`,
        [id]
    );

    return rows[0];
}

export async function getAgeGroups() {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT * FROM Age_Group ORDER BY Group_name'
    );
    return rows;
}

export async function getAgeGroup(id) {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT * FROM Age_Group WHERE Age_group_ID = ?',
        [id]
    );
    return rows[0];
}

export async function deleteAgeGroup(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Age_Group WHERE Age_group_ID = ?',
        [id]
    );
    return { message: "Age group deleted successfully" };
}

export async function updateAgeGroup(id, ageGroupName) {
    const pool = await getPool();

    await pool.query(
        `UPDATE Age_Group
         SET Group_name = ?
         WHERE Age_group_ID = ?`,
        [ageGroupName, id]
    );

    const [rows] = await pool.query(
        `SELECT * FROM Age_Group WHERE Age_group_ID = ?`,
        [id]
    );

    return rows[0];
}

/* ---------------- ARENA ---------------- */

export async function createArena(arenaName, capacity, location) {
    const id = randomUUID();
    const pool = await getPool();

    await pool.query(
        `INSERT INTO Arena (Arena_ID, Arena_name, Capacity, Location)
         VALUES (?, ?, ?, ?)`,
        [id, arenaName, capacity, location]
    );

    const [rows] = await pool.query(
        `SELECT * FROM Arena WHERE Arena_ID = ?`,
        [id]
    );

    return rows[0];
}

export async function getArenas() {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT * FROM Arena ORDER BY Arena_name'
    );
    return rows;
}

export async function getArena(id) {
    const pool = await getPool();
    const [rows] = await pool.query(
        'SELECT * FROM Arena WHERE Arena_ID = ?',
        [id]
    );
    return rows[0];
}

export async function deleteArena(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Arena WHERE Arena_ID = ?',
        [id]
    );
    return { message: "Arena deleted successfully" };
}

export async function updateArena(id, arenaName, capacity, location) {
    const pool = await getPool();

    await pool.query(
        `UPDATE Arena
         SET Arena_name = ?, Capacity = ?, Location = ?
         WHERE Arena_ID = ?`,
        [arenaName, capacity, location, id]
    );

    const [rows] = await pool.query(
        `SELECT * FROM Arena WHERE Arena_ID = ?`,
        [id]
    );

    return rows[0];
}