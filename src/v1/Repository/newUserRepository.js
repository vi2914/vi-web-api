import { getConnection, getPool } from '../data/db.js';
import { randomUUID } from "crypto";

export async function addNewEmployee(employee) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    const id = randomUUID();

    try {
        const { first_name, last_name, display_name, username, email, start_date, end_date, department } = employee;
        const [result] = await conn.query(
            `INSERT INTO NEW_EMPLOYEES (employee_id, first_name, last_name, display_name, username, email, start_date, end_date, department, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, first_name, last_name, display_name, username, email, start_date, end_date, department, 'pending']
        );
        return { id: result.insertId, ...employee };
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function getAllNewEmployees() {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM NEW_EMPLOYEES`);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }   
}

export async function getAllPendingNewEmployees() {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM NEW_EMPLOYEES WHERE status = 'pending'`);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }  
}

export async function getAllActiveNewEmployees() {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM NEW_EMPLOYEES WHERE status = 'active'`);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function getAllInactiveNewEmployees() {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM NEW_EMPLOYEES WHERE status = 'inactive'`);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function activateNewEmployee(id) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        await conn.query(`UPDATE NEW_EMPLOYEES SET status = 'active' WHERE employee_id = ?`, [id]);
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function deactivateNewEmployee(id) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        await conn.query(`UPDATE NEW_EMPLOYEES SET status = 'inactive' WHERE employee_id = ?`, [id]);
        await conn.query(`UPDATE NEW_EMPLOYEES SET end_date = CURDATE() WHERE employee_id = ?`, [id]);
    } catch (error) {
        throw error;
    } finally {        
        conn.release();
    }
}

export async function deleteNewEmployee(id) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        await conn.query(`DELETE FROM NEW_EMPLOYEES WHERE employee_id = ?`, [id]);
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function updateNewEmployee(id, employee) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const { first_name, last_name, display_name, username, email, start_date, end_date, department } = employee;
        await conn.query(
            `UPDATE NEW_EMPLOYEES SET first_name = ?, last_name = ?, display_name = ?, username = ?, email = ?, start_date = ?, end_date = ?, department = ? WHERE employee_id = ?`,
            [first_name, last_name, display_name, username, email, start_date, end_date, department, id]
        );
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function getNewEmployeeById(id) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM NEW_EMPLOYEES WHERE employee_id = ?`, [id]);
        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function getNewEmployeeByStatus(status) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM NEW_EMPLOYEES WHERE status = ?`, [status]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function getNewEmployeeByUsername(username) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM NEW_EMPLOYEES WHERE username = ?`, [username]);
        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}