import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const config = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
};

// Create a MySQL pool
const pool = mysql.createPool(config);

export default pool;