import pool from "../config/db.js";

export const getLogs = async () => {
    try {
        const query = `
            SELECT l.id, l.action,
                   json_build_object(
                       'id', u.id,
                       'username', u.username,
                       'password_hash', u.password_hash
                   ) AS user
            FROM logs l
            JOIN users u ON l.user_id = u.id;
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching logs:', error);
        throw error;
    }
};
// Get log by ID
export const getIdLogs = async (id) => {
    try {
        const query = `
            SELECT l.id, l.action,
                   json_build_object(
                       'id', u.id,
                       'username', u.username,
                       'password_hash', u.password_hash
                   ) AS user
            FROM logs l
            JOIN users u ON l.user_id = u.id
            WHERE l.id = $1;
        `;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            throw new Error('Log not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching log by ID:', error);
        throw error;
    }
};
// Create a new log
export const createLog = async (user_id, action) => {
    try {
        const result = await pool.query(
            'INSERT INTO logs (user_id, action) VALUES ($1, $2) RETURNING *',
            [user_id, action]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating log:', error);
        throw error;
    }
};
// Delete a log
export const deleteLog = async (id) => {
    try {
        const result = await pool.query('DELETE FROM logs WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            throw new Error('Log not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting log:', error);
        throw error;
    }
};