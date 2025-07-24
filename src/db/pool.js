// ✅ Load environment variables at the very top
require('dotenv').config();

// ✅ Debug: Check if DB_PASSWORD is loaded correctly
console.log("✅ DEBUG DB_PASSWORD =", process.env.DB_PASSWORD);

// ✅ Import pg
const { Pool } = require('pg');

// ✅ Create a PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),            // Convert to number just in case
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),    // Ensure it's treated as a string
  database: process.env.DB_NAME,
});

// ✅ Optional: Log successful connection (for debugging)
pool.connect()
  .then(() => console.log("🎉 PostgreSQL connected successfully"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err.message));

module.exports = pool;
