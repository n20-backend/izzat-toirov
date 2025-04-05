import pool from "../config/db.js";

//get all employees
export const getEmployees = async () => {
    try {
        const query = `
            SELECT e.id, e.first_name, e.last_name, e.email, e.phone, e.position, e.salary, e.hire_date,
                    json_build_object(
                        'id', d.id,
                        'name', d.name
                    ) AS department
            FROM employees e
            JOIN departments d ON e.department_id = d.id;
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

//get employee by id
export const getIdEmployees = async (id) => {
    try {
        const query = `
            SELECT e.id, e.first_name, e.last_name, e.email, e.phone, e.position, e.salary, e.hire_date, e.created_at, e.updated_at,
                    json_build_object(
                        'id', d.id,
                        'name', d.name
                    ) AS department
            FROM employees e
            JOIN departments d ON e.department_id = d.id
            WHERE e.id = $1;
        `;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            throw new Error('Employee not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        throw error;
    }
};

//create employee
export const createEmployee = async (first_name, last_name, email, phone, department_id, position, salary) => {
    try {
        const result = await pool.query(
            'INSERT INTO employees (first_name, last_name, email, phone, department_id, position, salary) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [first_name, last_name, email, phone, department_id, position, salary]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
};


//Delete employee
export const deleteEmployee = async (id) => {
    try {
        const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            throw new Error('Employee not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
        
    }
};
