const express = require("express");
const { handleUserSignUp, handleUserLogin } = require("../controllers/user");
const router = express.Router();

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/", (req, res) => {
  res.render("signUp");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
