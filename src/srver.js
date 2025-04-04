import express from "express";
import cors from 'cors';
import departmentsRouter from "./routers/departments.js";
import employeesRouter from "./routers/employees.js";
import usersRouter from "./routers/users.js";
import logsRouter from "./routers/logs.js";
import aurthRouter from "./routers/auth.js";

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.use('/departments', departmentsRouter);
app.use('/employees', employeesRouter);
app.use('/users', usersRouter);
app.use('/logs', logsRouter);
app.use('/auth', aurthRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});