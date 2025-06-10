const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  let pool;
  try {
    pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 10000, // 10s timeout
      queueLimit: 0
    });
  } catch (err) {
    console.error("❌ MySQL pool creation error:", err);
    return; // exit early if pool creation fails
  }

  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log("✅ Connected to MySQL! Result:", rows[0].solution);
  } catch (err) {
    console.error("❌ MySQL query error:", err);
  }
})();
