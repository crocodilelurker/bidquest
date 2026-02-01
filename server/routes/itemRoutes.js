const express = require("express");
const router = express.Router();

const itemController = require("../controller/itemController");
const authMiddleware = require("../middlewares/authMiddleware")


router.get("/", (req, res) => {
    res.json({
        "health": "ok"
    })
})
// routes for getting an item detail and adding an item 
router.post("/add", authMiddleware, itemController.addItem);
router.get("/all", itemController.getAllItems)
router.get("/owned", authMiddleware, itemController.getOwnedItems)
router.get("/:id", itemController.getItemData)


module.exports = router;


