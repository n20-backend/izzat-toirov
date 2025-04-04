import express from 'express';
import { getLogs, getIdLogs, createLog, deleteLog } from '../controllers/logs.js';

const router = express.Router();
// Get all logs
router.get('/', async (req, res) => {
    try {
        const logs = await getLogs();
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get log by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const log = await getIdLogs(id);
        if (!log) {
            return res.status(404).json({ error: 'Log not found' });
        }
        res.status(200).json(log);
    } catch (error) {
        console.error('Error fetching log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Create a new log
router.post('/', async (req, res) => {
    const { user_id, action } = req.body;
    try {
        const newLog = await createLog(user_id, action);
        res.status(201).json(newLog);
    } catch (error) {
        console.error('Error creating log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Delete a log
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLog = await deleteLog(id);
        if (!deletedLog) {
            return res.status(404).json({ error: 'Log not found' });
        }
        res.status(200).json(deletedLog);
    } catch (error) {
        console.error('Error deleting log:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export default router;