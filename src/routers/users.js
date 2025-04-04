import express from 'express';
import { getUsers, getIdUsers, createUser, deleteUser } from '../controllers/users.js';

const router = express.Router();
// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getIdUsers(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Create a new user
router.post('/', async (req, res) => {
    const { username, email, password_hash, role } = req.body;
    try {
        const newUser = await createUser(username, email, password_hash, role);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Delete a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export default router;