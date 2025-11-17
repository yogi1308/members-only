const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    res.render("index");
});

router.get("/login", async (req, res) => {
    res.render("login-form");
});

router.get("/signup", async (req, res) => {
    res.render("signup-form");
});

module.exports = router