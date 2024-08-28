// Load the MySQL pool connection
import pool from '../data/config.js';
import express, { request } from 'express';
import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const router = (app) => {
    /*app.get("/", (req, res) => {
        console.log(`URL:  ${req.url}`);
        res.send({
            message: "Node.js and Express REST API"
        });
    });*/

    app.use(express.static('public'));

    // Display all users
    app.get("/users", (req, res) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            res.send(result);
        });
    });

    // Display a single user by ID
    app.get("/users/:id", (req, res) => {
        const id = req.params.id;
        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            res.send(result);
        });
    });

    // Add a new user
    app.post("/users", (req, res) => {
        pool.query('INSERT INTO users SET ?', req.body, (error, result) => {
            if (error) throw error;
            res.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });

    // update an existing user
    app.patch("/users/:id", (req, res) => {
        const id = req.params.id;
        console.log('body: ', req.body);
        
        pool.query('UPDATE users SET ? WHERE id = ?', [req.body, id], (error, result) => {
            if (error) throw error;
            res.status(200).send({
                message: "User updated successfully.",
                status: 'OK',
            });
        });
    });

    // Delete a user by ID
    app.delete("/users/:id", (req, res) => {
        const id = req.params.id;
        
        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            res.status(200).send({
                message: "User deleted successfully.",
                status: 'OK',
            });
        });
    });
};

// Export the router
export default router;