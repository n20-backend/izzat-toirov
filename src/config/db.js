import express from 'express';
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'oy2',
    password: 'izzat1337',
    port: 5432
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