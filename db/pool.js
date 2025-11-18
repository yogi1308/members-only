const { Pool } = require("pg");

pool = new Pool({
    connectionString: process.env.DATABASE_URI
})

async function insertUsername(username, password) {
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
  }
  catch {
    console.log("FAILED")
    return "FAILED"
  }
}

module.exports = {insertUsername}