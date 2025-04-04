import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createAuth, getAuth } from '../controllers/auth.js';

const router = Router();

router.post('/register', async (req, res)=>{
    try {
        const { username, email, password_hash} = req.body;
        if (!password_hash) {
            return res.status(400).json({ error: 'Password is required' });
        }
        let hash = await bcrypt.hashSync(password_hash, 10);
        const newUser = await createAuth(username, email, hash);
        if (!newUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        if (!newUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
        
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password_hash } = req.body;
        const user = await getAuth(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isValidPassword = await bcrypt.compare(password_hash, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;