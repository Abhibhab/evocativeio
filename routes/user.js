const express = require("express");
const router = express.Router();

const passport = require("passport");
const catchAsync = require("../utilities/catchAsync");
const users = require("../controllers/user");

const User = require("../models/user");

router.get("/register", users.renderRegister);
router.post("/register", catchAsync(users.registerUser));

router.get("/login", users.renderLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.loginUser
);
router.get("/logout", users.logout);

module.exports = router;
