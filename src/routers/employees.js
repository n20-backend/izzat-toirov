import express from 'express';
import { employeeSchemaMiddleware } from '../middleware/validator.js';
import { getEmployees, getIdEmployees, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employees.js';

const router = express.Router();
// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await getEmployees();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get employee by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await getIdEmployees(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Create a new employee
router.post('/', employeeSchemaMiddleware, async (req, res) => {
    const { first_name, last_name, email, phone, department_id, position, salary } = req.body;
    try {
        const newEmployee = await createEmployee(first_name, last_name, email, phone, department_id, position, salary);
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Uptade employee
router.put('/:id',  updateEmployee);

// Delete an employee
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEmployee = await deleteEmployee(id);
        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(deletedEmployee);
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;