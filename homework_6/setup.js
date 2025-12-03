import pool from './db.js'

async function setup() {
  const sql = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL
    );
  `
  await pool.query(sql)
  console.log('Table "products" ensurend')
  process.exit(0)
}
setup().catch((err) => {
  console.error('Setup error:', err)
  process.exit(1)
})
