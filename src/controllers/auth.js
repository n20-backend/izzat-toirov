import pool from "../config/db.js";

export const createAuth = async (username, email, password_hash) => {
    try {
        const query = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *';
        const result = await pool.query(query, [username, email, password_hash]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching auth:', error);
        throw error;
        
    }
};

export const getAuth = async (email) => {
    try {
        const query = 'SELECT id, email, password_hash FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Error fetching auth:', error);
        throw error;
    }
};


