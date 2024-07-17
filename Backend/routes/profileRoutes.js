const express = require("express");
const profileController = require("../controllers/profileController");
const authController = require("../controllers/authController");
const { upload } = require("../controllers/userController");

const router = express.Router();

router.use(authController.protect);

// router.post("/createProfile", profileController.createProfile);
router.route("/updateProfile").patch(
        upload.single("profilePicture"),
        profileController.updateProfile,
);

router.route("/getProfileById").post(profileController.getProfileById);

router.post(
        "/createProfile",
        upload.single("profilePicture"),
        profileController.createProfileWithUpload,
);

router.get("/getProfile", profileController.getProfile);

module.exports = router;
