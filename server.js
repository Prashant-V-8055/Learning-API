const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());

// Supabase DB connection details here 👇
const pool = new Pool({
  user: 'postgres',
  host: 'db.papjehehbbggneadffyt.supabase.co',
  database: 'postgres',
  password: 'Apilab@8055',
  port: 5432
});

pool.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL
  );
`);

app.post('/send', async (req, res) => {
  const { name, message } = req.body;
  try {
    await pool.query(
      'INSERT INTO User_Details (name, message) VALUES ($1, $2)',
      [name, message]
    );
    res.send(`Saved to DB. Thank you, ${name}!`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving message");
  }
});

app.get('/', (req, res) => {
  res.send("API is live!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
