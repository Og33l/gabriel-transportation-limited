require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function runMigrations() {
  try {
    console.log('Running database migrations...');

    const migrationFile = path.join(__dirname, '001_create_tables.sql');
    const sql = fs.readFileSync(migrationFile, 'utf-8');

    await pool.query(sql);
    console.log('✓ Migrations completed successfully');

    await pool.end();
  } catch (err) {
    console.error('✗ Migration failed:', err);
    process.exit(1);
  }
}

runMigrations();