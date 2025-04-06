import pool from "../config/db.js";

//get all users
export const getUsers = async () => {
    try {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

//get user by id
export const getIdUsers = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

//create user
export const createUser = async (username, email, phone_number, password_hash, role, otp_code) => {
    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, phone_number, password_hash, role, otp_code) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [username, email, phone_number, password_hash, role, otp_code] // Tartibni to‘g‘riladim
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};


//delete user
export const deleteUser = async (id) => {
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};