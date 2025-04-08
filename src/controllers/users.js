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
export const createUser = async (username, email, password_hash, role) => {
    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, password_hash, role] // Tartibni to‘g‘riladim
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

//Uptade user

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const {
      username,
      email,
      password_hash,
      role,
    } = req.body;
  
    const fields = [];
    const values = [];
    let index = 1;
  
    if (username !== undefined) {
      fields.push(`username = $${index++}`);
      values.push(username);
    }
    if (email !== undefined) {
      fields.push(`email = $${index++}`);
      values.push(email);
    }
    if (password_hash !== undefined) {
      fields.push(`password_hash = $${index++}`);
      values.push(password_hash);
    }
    if (role !== undefined) {
      fields.push(`role = $${index++}`);
      values.push(role);
    }
  
    if (fields.length === 0) {
      return res.status(400).json({ message: 'Hech qanday ma\'lumot yuborilmadi' });
    }
  
    fields.push(`updated_at = NOW()`);
  
    const query = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${index}
      RETURNING *;
    `;
  
    values.push(id);
  
    try {
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ message: 'Server xatosi' });
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