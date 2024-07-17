const express = require("express");
const router = express.Router();
const shortStoryController = require("../controllers/shortStoryController");
const authController = require("../controllers/authController");

// Protect all routes
router.use(authController.protect);

router.get("/", shortStoryController.getAllShortStories);
router.put("/update", shortStoryController.updateShortStory);
router.delete("/delete", shortStoryController.deleteShortStory);
router.post("/create", shortStoryController.createShortStory);

module.exports = router;
