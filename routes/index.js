const express = require("express")
const router = express.Router()
const {insertUsername} = require("../db/pool")
const bcrypt = require("bcryptjs")
const passport = require("passport");

router.get("/", async (req, res) => {
    if (req.user) {
        res.render("index", { user: req.user });
    }
    else {res.redirect("/login")}
});

router.get("/login", async (req, res) => {
    res.render("login-form");
});

router.get("/signup", async (req, res) => {
    res.render("signup-form");
});

router.post("/signup", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await insertUsername(req.body.username, hashedPassword)
        res.redirect("/");
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {return err}
        res.redirect("/login")
    })
})

module.exports = router