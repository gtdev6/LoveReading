const express = require("express");
const suggestionController = require("../controllers/suggestionController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router.route("/")
        .get(suggestionController.getAllSuggestions)
        .post(suggestionController.createSuggestion);

module.exports = router;
