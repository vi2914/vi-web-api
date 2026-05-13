import { randomUUID } from "crypto";
import { getPool, getConnection } from "../data/db.js";

/* ---------------- AGE GROUP ---------------- */

export async function createAgeGroup(ageGroupName) {
    const id = randomUUID();
    const connection = await getConnection();

    await connection.execute(
        `INSERT INTO Age_Group (Age_group_ID, Group_name)
         VALUES (?, ?)`,
        [id, ageGroupName]
    );

    const [rows] = await connection.execute(
        `SELECT * FROM Age_Group WHERE Age_group_ID = ?`,
        [id]
    );

    return rows[0];
}

export async function getAgeGroups() {
    const connection = await getConnection();
    const [rows] = await connection.execute(
        'SELECT * FROM Age_Group ORDER BY Group_name'
    );
    return rows;
}

export async function getAgeGroup(id) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
        'SELECT * FROM Age_Group WHERE Age_group_ID = ?',
        [id]
    );
    return rows[0];
}

export async function deleteAgeGroup(id) {
    const connection = await getConnection();
    await connection.execute(
        'DELETE FROM Age_Group WHERE Age_group_ID = ?',
        [id]
    );
    return { message: "Age group deleted successfully" };
}

export async function updateAgeGroup(id, ageGroupName) {
    const connection = await getConnection();

    await connection.execute(
        `UPDATE Age_Group
         SET Group_name = ?
         WHERE Age_group_ID = ?`,
        [ageGroupName, id]
    );

    const [rows] = await connection.execute(
        `SELECT * FROM Age_Group WHERE Age_group_ID = ?`,
        [id]
    );

    return rows[0];
}

/* ---------------- ARENA ---------------- */

export async function createArena(arenaName, capacity, location) {
    const id = randomUUID();
    const connection = await getConnection();

    await connection.execute(
        `INSERT INTO Arena (Arena_ID, Arena_name, Capacity, Location)
         VALUES (?, ?, ?, ?)`,
        [id, arenaName, capacity, location]
    );

    const [rows] = await connection.execute(
        `SELECT * FROM Arena WHERE Arena_ID = ?`,
        [id]
    );

    return rows[0];
}

export async function getArenas() {
    const connection = await getConnection();
    const [rows] = await connection.execute(
        'SELECT * FROM Arena ORDER BY Arena_name'
    );
    return rows;
}

export async function getArena(id) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
        'SELECT * FROM Arena WHERE Arena_ID = ?',
        [id]
    );
    return rows[0];
}

export async function deleteArena(id) {
    const connection = await getConnection();
    await connection.execute(
        'DELETE FROM Arena WHERE Arena_ID = ?',
        [id]
    );
    return { message: "Arena deleted successfully" };
}

export async function updateArena(id, arenaName, capacity, location) {
    const connection = await getConnection();

    await connection.execute(
        `UPDATE Arena
         SET Arena_name = ?, Capacity = ?, Location = ?
         WHERE Arena_ID = ?`,
        [arenaName, capacity, location, id]
    );

    const [rows] = await connection.execute(
        `SELECT * FROM Arena WHERE Arena_ID = ?`,
        [id]
    );

    return rows[0];
}