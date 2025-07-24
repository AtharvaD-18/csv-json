const express = require('express');
require('dotenv').config();
const { parseCSVToJSON } = require('./utils/csvParser');
const { insertUsers, printAgeDistribution } = require('./services/userService');
const pool = require('./db/pool'); // Add this line to import the pool

const app = express();

app.get('/upload', async (req, res) => {
    try {
        const filePath = process.env.CSV_FILE_PATH;
        const users = parseCSVToJSON(filePath);

        await insertUsers(users);
        await printAgeDistribution();

        res.send('CSV processed and users inserted successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing CSV');
    }
});

app.get('/test-db', async (req, res) => {
    try {
        await pool.query('SELECT 1'); // Simple query to test connection
        res.send('Database connection successful!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Database connection failed');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
