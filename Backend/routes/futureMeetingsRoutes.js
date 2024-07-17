const express = require("express");
const meetingController = require("./../controllers/futureMeetingController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/")
        .get(authController.protect, meetingController.getAllFutureMeetings)
        .post(
                authController.protect,
                authController.restrictTo("Leader"),
                meetingController.createFutureMeeting,
        );

router.route("/approveFutureMeetingBook").patch(
        authController.protect,
        meetingController.approveFutureMeetingBook,
);

router.route("/addSuggestion").patch(
        authController.protect,
        meetingController.addBookToSuggestions,
);

router.route("/:id")
        .get(authController.protect, meetingController.getFutureMeeting)
        .patch(
                authController.protect,
                authController.restrictTo("Leader"),
                meetingController.updateFutureMeeting,
        )
        .delete(
                authController.protect,
                authController.restrictTo("Leader"),
                meetingController.deleteFutureMeeting,
        );

module.exports = router;
