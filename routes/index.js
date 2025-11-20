const express = require("express")
const router = express.Router()
const {insertUsername} = require("../db/pool")

router.get("/", async (req, res) => {
    res.render("index", { user: req.user });
});

router.get("/login", async (req, res) => {
    res.render("login-form");
});

router.get("/signup", async (req, res) => {
    res.render("signup-form");
});

router.post("/signup", async(req, res) => {
    try {
        await insertUsername(req.body.username, req.body.password)
        res.redirect("/");
    }
    catch (error) {
        console.error(error);
        return next(err);
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