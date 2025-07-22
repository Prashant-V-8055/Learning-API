const express = require('express');
const { Pool } = require('pg');
const app = express();
alert(" i am in server");
// ✅ Use process.env.PORT (not lowercase `port`)
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ✅ Supabase DB connection
const pool = new Pool({
  user: 'postgres',
  host: 'db.papjehehbbggneadffyt.supabase.co', // 👈 Replace with your actual host
  database: 'postgres',
  password: 'Apilab@8055', // 👈 Replace with your actual password
  port: 5432
});

// ✅ Create table if not exists (optional, for testing)
pool.query(`
  CREATE TABLE IF NOT EXISTS user_details (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL
  );
`).catch(err => console.error("Table creation error:", err));

// ✅ POST route to save messages
app.post('/send', async (req, res) => {
  const { name, message } = req.body;
  try {
    await pool.query(
      'INSERT INTO user_details (name, message) VALUES ($1, $2)',
      [name, message]
    );
    res.send(`Saved to DB. Thank you, ${name}!`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving message");
  }
});

// ✅ GET root route
app.get('/', (req, res) => {
  res.send("API is live!");
});

// ✅ Bind to 0.0.0.0 and correct PORT
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
