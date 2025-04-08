import express from "express";
import departmentsRouter from "./routers/departments.js";
import employeesRouter from "./routers/employees.js";
import usersRouter from "./routers/users.js";
import logsRouter from "./routers/logs.js";
import aurthRouter from "./routers/auth.js";

const app = express();
app.use(express.json());
app.use('/departments', departmentsRouter);
app.use('/employees', employeesRouter);
app.use('/users', usersRouter);
app.use('/logs', logsRouter);
app.use('/', aurthRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});