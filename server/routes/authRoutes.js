const express = require("express");
const router = express.Router();

const { createUser, loginUser, logout } = require("../controller/authController");


router.get("/", (req, res) => {
    res.json({ "health": "ok" });
})
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
