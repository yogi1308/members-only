const express = require("express")
const router = express.Router()
const {insertUsername, createPosts, getAllPosts} = require("../db/pool")
const bcrypt = require("bcryptjs")
const passport = require("passport");

router.get("/", async (req, res) => {
    if (req.user) {
        try {
            posts = await getAllPosts()
            res.render("index", { user: req.user, page: "index", allPosts: posts.rows });
        }
        catch (error) {
            console.error(error);
            res.render("index", { user: req.user, page: "index", allPosts: "Unable to get Posts" });
        }
    }
    else {res.redirect("/login")}
});

router.get("/login", async (req, res) => {
    res.render("login-form");
});

router.get("/new-post", async (req, res) => {
    if (req.user) {
        res.render("index", { user: req.user, page: "new-post" });
    }
    else {res.redirect("/login")}
});

router.post("/new-post", async(req, res) => {
    if (req.user) {
        console.log(req.body.title, req.body.content, req.user.id)
        await createPosts(req.body.title, req.body.content, req.user.id)
        res.redirect("/");
    }
    else {res.redirect("/login")}
})

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