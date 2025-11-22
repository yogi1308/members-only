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

async function createPosts(title, content, userId) {
  datePosted = formatDateForDisplay(new Date)
  iconColor = generateIconColor()
  try {
    return await pool.query("INSERT INTO posts (title, content, date_posted, icon_color, user_id) VALUES ($1, $2, $3, $4, $5)", [title, content, datePosted, iconColor, userId])
  }
  catch (error) {
    console.log("FAILED", error)
    return "FAILED"
  }
}

async function getAllPosts() {
  try {
    const result = await pool.query(`
      SELECT
        posts.id,
        posts.title,
        posts.content,
        posts.user_id,
        posts.date_posted,
        posts.icon_color,
        users.username
      FROM
        posts
      JOIN
        users ON posts.user_id = users.id
      ORDER BY posts.id DESC;
    `);
    return result;
  } catch (error) {
    console.error("FAILED!!!", error);
    return { rows: [] }; // Return an empty array on error
  }
}


function formatDateForDisplay(dateObject) {
  if (!(dateObject instanceof Date)) {
    dateObject = new Date(dateObject);
    if (isNaN(dateObject.getTime())) {
      return "Invalid Date";
    }
  }

  const day = String(dateObject.getUTCDate()).padStart(2, '0');
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = dateObject.getUTCFullYear();
  const hours = String(dateObject.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function displayPosted(dateString) {
    // Handle cases where the date string might be null or undefined
    if (!dateString) {
        return "Date not available";
    }

    // Parse the "DD/MM/YYYY HH:mm" string without regex
    const parts = dateString.split(' ');
    const dateParts = parts[0] ? parts[0].split('/') : null;
    const timeParts = parts[1] ? parts[1].split(':') : null;

    if (!dateParts || dateParts.length !== 3 || !timeParts || timeParts.length !== 2) {
        return "Invalid Date Format";
    }

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // JS month is 0-indexed
    const year = parseInt(dateParts[2], 10);
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(hours) || isNaN(minutes)) {
        return "Invalid Date Components";
    }

    // Create a UTC date object from the parsed parts
    const pastDate = new Date(Date.UTC(year, month, day, hours, minutes));
    const now = new Date();

    const seconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

    let interval = seconds / 315360000; // 10 years = 1 decade
    if (interval >= 1) {
        const decades = Math.floor(interval);
        return decades === 1 ? "a decade ago" : decades + " decades ago";
    }
    interval = seconds / 31536000; // 1 year
    if (interval >= 1) {
        const years = Math.floor(interval);
        return years === 1 ? "a year ago" : years + " years ago";
    }
    interval = seconds / 2592000; // 1 month (approx 30 days)
    if (interval >= 1) {
        const months = Math.floor(interval);
        return months === 1 ? "a month ago" : months + " months ago";
    }
    interval = seconds / 86400; // 1 day
    if (interval >= 1) {
        const days = Math.floor(interval);
        return days === 1 ? "a day ago" : days + " days ago";
    }
    interval = seconds / 3600; // 1 hour
    if (interval >= 1) {
        const hours = Math.floor(interval);
        return hours === 1 ? "an hour ago" : hours + " hours ago";
    }
    interval = seconds / 60; // 1 minute
    if (interval >= 1) {
        const minutes = Math.floor(interval);
        return minutes === 1 ? "a minute ago" : minutes + " minutes ago";
    }
    if (seconds < 10) return "just now";
    return Math.floor(seconds) + " seconds ago";
}

function generateIconColor() {
  const randomInt = Math.floor(Math.random() * 0xFFFFFF);
  const hex = randomInt.toString(16).padStart(6, '0');
  return `#${hex}`;
}

module.exports = {insertUsername, findUser, findUserById, createPosts, getAllPosts, formatDateForDisplay, displayPosted}
