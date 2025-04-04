import express from 'express';
import { getDepartments, getIdDepartments, createDepartment, deleteDepartment } from '../controllers/departments.js';

const router = express.Router();

// Get all departments
router.get('/', async (req, res) => {
    try {
        const departments = await getDepartments();
        res.status(200).json(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get department by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const department = await getIdDepartments(id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json(department);
    } catch (error) {
        console.error('Error fetching department:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new department
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newDepartment = await createDepartment(name);
        res.status(201).json(newDepartment);
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a department
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDepartment = await deleteDepartment(id);
        if (!deletedDepartment) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json(deletedDepartment);
    } catch (error) {
        console.error('Error deleting department:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;