const express = require("express");
const router = express.Router();

const itemController = require("../controller/itemController");
const authMiddleware = require("../middlewares/authMiddleware")


router.get("/", (req, res) => {
    res.json({
        "health": "ok"
    })
})

router.post("/add", authMiddleware, itemController.addItem);

module.exports = router;


