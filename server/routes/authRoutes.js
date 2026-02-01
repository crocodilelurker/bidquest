const express = require("express");
const router = express.Router();

const { createUser, loginUser, logout } = require("../controller/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { getUserProfile } = require("../controller/userController");


router.get("/", (req, res) => {
    res.json({ "health": "ok" });
})
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/me", authMiddleware, getUserProfile);

module.exports = router;
