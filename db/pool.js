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

async function findUser(username) {
  try {
    return await pool.query("SELECT * FROM users WHERE username = $1", [username])
  }
  catch {
    console.log("FAILED")
    return "FAILED"
  }
}

async function findUserById(id) {
  try {
    return await pool.query("SELECT * FROM users WHERE id = $1", [id])
  }
  catch {
    console.log("FAILED")
    return "FAILED"
  }
}

module.exports = {insertUsername, findUser, findUserById}