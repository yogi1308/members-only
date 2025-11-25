const express = require("express")
const router = express.Router()
const {insertUsername, createPosts, getAllPosts, displayPosted, changeMembershipStatus} = require("../db/pool")
const bcrypt = require("bcryptjs")
const passport = require("passport");

router.get("/", async (req, res) => {
    if (req.user) {
        try {
            const postsResult = await getAllPosts();
            const allPosts = postsResult.rows.map(post => {
                return {
                    ...post,
                    displayDate: displayPosted(post.date_posted)
                };
            });
            res.render("index", { user: req.user, page: "index", allPosts: allPosts });
        }
        catch (error) {
            console.error(error);
            res.render("index", { user: req.user, page: "index", allPosts: [] }); // Send empty array on error
        }
    }
    else {res.redirect("/login")}
});

router.get("/login", (req, res) => {
    res.render("login-form", { incorrect: req.flash('error') });
});

router.get("/new-post", (req, res) => {
    if (req.user) {
        res.render("index", { user: req.user, page: "new-post" });
    }
    else {res.redirect("/login")}
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {return err}
        res.redirect("/login")
    })
})

router.get("/join-membership", (req, res) => {
    res.render("join-membership")
})

router.get("/signup", async (req, res) => {
    res.render("signup-form", { messages: req.flash('error') });
});

router.post("/signup", async(req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await insertUsername(req.body.username, hashedPassword);
        if (!newUser) {
            req.flash('error', 'Sign up failed, please try again. The username might be taken.');
            return res.redirect('/signup');
        }
        console.log("User object being passed to req.logIn:", newUser);
        req.logIn(newUser, (err) => {
            if (err) { 
                return next(err); 
            }
            return res.redirect("/");
        });
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.post("/new-post", async(req, res) => {
    if (req.user) {
        await createPosts(req.body.title, req.body.content, req.user.id)
        res.redirect("/");
    }
    else {res.redirect("/login")}
})

router.post("/join-membership", async(req, res) => {
    if (req.user) {
        await changeMembershipStatus(req.user.id)
        res.redirect("/");
    }
    else {res.redirect("/login")}
})

module.exports = router