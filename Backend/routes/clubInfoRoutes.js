const express = require("express");
const clubInfoController = require("../controllers/clubInfoController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/")
        .get(clubInfoController.getClubInfo)
        .post(
                authController.protect,
                authController.restrictTo("Leader"),
                clubInfoController.createClubInfo,
        )
        .patch(
                authController.protect,
                authController.restrictTo("Leader"),
                clubInfoController.updateClubInfo,
        );

module.exports = router;
