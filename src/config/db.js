import express from 'express';
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: process.env.DB_NAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const db = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database: ', error);
        
    }
};
db();
export default pool;