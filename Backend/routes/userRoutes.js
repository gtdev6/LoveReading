const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/login").post(userController.loginUser);
router.route("/signup").post(userController.createUser);
// router.route("/logout").post(userController.logoutUser);

router.route("/refresh").get(userController.refreshToken);

router.route("/users-with-profiles").get(
        authController.protect,
        userController.getAllUsersWithProfiles,
);

router.route("/hasProfile").get(
        authController.protect,
        userController.getProfileId,
);

router.route("/")
        .get(userController.getAllUsers)
        .post(userController.createUser);

router.route("/me").get(authController.protect, userController.userInfo);

router.route("/:id")
        .get(userController.getUser)
        .patch(userController.updateUser)
        .delete(userController.deleteUser);

module.exports = router;
