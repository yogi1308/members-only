const express = require("express")
const router = express.Router()
const {insertUsername} = require("../db/pool")

router.get("/", async (req, res) => {
    res.render("index");
});

router.get("/login", async (req, res) => {
    res.render("login-form");
});

router.get("/signup", async (req, res) => {
    res.render("signup-form");
});

router.post("/signup", async(req, res) => {
    try {
        quesryStatus = insertUsername(req.body.username, req.body.password)
    }
    finally {
        res.render("signup-form");
    }
})

module.exports = router