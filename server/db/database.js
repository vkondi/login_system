const { Pool } = require("pg");

const tables = [
  {
    name: "accounts",
    definition: `CREATE TABLE accounts (
      USER_ID SERIAL PRIMARY KEY,
      USERNAME VARCHAR(50) UNIQUE NOT NULL,
      PASSWORD VARCHAR(50) UNIQUE NOT NULL,
      NAME VARCHAR(50) UNIQUE NOT NULL
    );`,
  },
  // Add more tables if needed
];

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function initializeDatabase() {
  try {
    await pool.connect();

    // Create the table if it doesn't exist
    for (const table of tables) {
      const tableCheckQuery = `
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '${table.name}'
      `;
      const tableCheckResult = await pool.query(tableCheckQuery);

      if (tableCheckResult.rowCount === 0) {
        await pool.query(table.definition);
        console.log(`Table ${table.name} created.`);
      } else {
        console.log(`Table ${table.name} already exists.`);
      }
    }

    console.log("Database and table initialized successfully");
  } catch (err) {
    console.error("Error initializing database:", err);
  }

  return pool;
}

module.exports = {
  initializeDatabase,
  pool,
};
