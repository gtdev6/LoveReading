const express = require("express");
const meetingController = require("./../controllers/meetingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/")
        .get(authController.protect, meetingController.getAllMeetings)
        .post(
                authController.protect,
                authController.restrictTo("Leader"),
                meetingController.createMeeting,
        );

router.route("/bookMeeting").patch(
        authController.protect,
        meetingController.bookMeeting,
);

router.route("/:id")
        .get(authController.protect, meetingController.getMeeting)
        .patch(
                authController.protect,
                authController.restrictTo("Leader"),
                meetingController.updateMeeting,
        )
        .delete(
                authController.protect,
                authController.restrictTo("Leader"),
                meetingController.deleteMeeting,
        );

module.exports = router;
