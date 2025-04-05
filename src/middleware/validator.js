import { validateUser, employeeSchema } from "../validator/index.js";

export const validateUserMiddleware = async (req, res, next) => {
    const { username, email, password_hash } = req.body;
    try {
        validateUser.parse({ username, email, password_hash });
        next();
    } catch (error) {
        const messages = error.errors.map(err => `${err.path[0]}: ${err.message}`);
        return res.status(400).json({ errors: messages });
    }
};

export const employeeSchemaMiddleware = async (req, res, next) => {
    const { first_name, last_name, email, phone, position, salary } = req.body;
    try {
        employeeSchema.parse({ first_name, last_name, email, phone, position, salary });
        next();
    } catch (error) {
        const messages = error.errors.map(err => `${err.path[0]}: ${err.message}`);
        return res.status(400).json({ errors: messages });
    }
}