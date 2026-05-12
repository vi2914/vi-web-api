import { randomUUID } from "crypto";
import { getPool } from "../data/db.js";

export async function createAgeGroup(ageGroupName) {
    const id = randomUUID();
    const pool = await getPool();
    const result = await pool.query(
        `INSERT INTO Age_Group (Age_group_ID, Group_name)
             VALUES ($1, $2)
             RETURNING *`,
        [id, ageGroupName]
    );
    return result.rows[0];
}

export async function getAgeGroups() {
    const pool = await getPool();
    const result = await pool.query(
        'SELECT * FROM Age_Group ORDER BY Group_name'
    );
    return result.rows;
}

export async function getAgeGroup(id) {
    const pool = await getPool();
    const result = await pool.query(
        'SELECT * FROM Age_Group WHERE Age_group_ID = $1',
        [id]
    );
    return result.rows[0];
}

export async function deleteAgeGroup(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Age_Group WHERE Age_group_ID = $1',
        [id]
    );
}

export async function updateAgeGroup(id, ageGroupName) {
    const pool = await getPool();
    const result = await pool.query(
        `UPDATE Age_Group
             SET Group_name = $1
             WHERE Age_group_ID = $2
             RETURNING *`,
        [ageGroupName, id]
    );
    return result.rows[0];
}

export async function createSport(sportName) {
    const id = randomUUID();
    const pool = await getPool();
    const result = await pool.query(
        `INSERT INTO Sport (Sport_ID, Sport_name)
             VALUES ($1, $2)
             RETURNING *`,
        [id, sportName]
    );
    return result.rows[0];
}

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
        'SELECT * FROM Sport WHERE Sport_ID = $1',
        [id]
    );
    return result.rows[0];
}

export async function deleteSport(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Sport WHERE Sport_ID = $1',
        [id]
    );
}

export async function updateSport(id, sportName) {
    const pool = await getPool();
    const result = await pool.query(
        `UPDATE Sport
             SET Sport_name = $1
             WHERE Sport_ID = $2
             RETURNING *`,
        [sportName, id]
    );
    return result.rows[0];
}

export async function createArena(arenaName, capacity, location) {
    const id = randomUUID();
    const pool = await getPool();
    const result = await pool.query(
        `INSERT INTO Arena (Arena_ID, Arena_name, Capacity, Location)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
        [id, arenaName, capacity, location]
    );
    return result.rows[0];
}

export async function getArenas() {
    const pool = await getPool();
    const result = await pool.query(
        'SELECT * FROM Arena ORDER BY Arena_name'
    );
    return result.rows;
}

export async function getArena(id) {
    const pool = await getPool();
    const result = await pool.query(
        'SELECT * FROM Arena WHERE Arena_ID = $1',
        [id]
    );
    return result.rows[0];
}

export async function deleteArena(id) {
    const pool = await getPool();
    await pool.query(
        'DELETE FROM Arena WHERE Arena_ID = $1',
        [id]
    );
}

export async function updateArena(id, arenaName, capacity, location) {
    const pool = await getPool();
    const result = await pool.query(
        `UPDATE Arena
             SET Arena_name = $1, Capacity = $2, Location = $3
             WHERE Arena_ID = $4
             RETURNING *`,
        [arenaName, capacity, location, id]
    );
    return result.rows[0];
}