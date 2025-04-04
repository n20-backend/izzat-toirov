import pool from '../config/db.js';

// Get all departments
export const getDepartments = async () => {
    try {
        const result = await pool.query('SELECT * FROM departments');
        return result.rows;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

// Get department by ID
export const getIdDepartments = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM departments WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error('Department not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching department by ID:', error);
        throw error;
    }
};

// Create a new department
export const createDepartment = async (name) => {
    try {
        const result = await pool.query(
            'INSERT INTO departments (name) VALUES ($1) RETURNING *',
            [name]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
};

// Delete a department
export const deleteDepartment = async (id) => {
    try {
        const result = await pool.query('DELETE FROM departments WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            throw new Error('Department not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting department:', error);
        throw error;
    }
};

