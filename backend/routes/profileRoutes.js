const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getUserProfile,
  createUpdateUserProfile,
  updateUserAvatar,
  deleteUserAvatar,
  PorfileChangePassword,
} = require("../controllers/profileController");
const { imageUpload } = require("../middleware/imageUpload");

const router = express.Router();

router.route("/get-my-profile").get(isAuthenticatedUser, getUserProfile);

router.route("/change-password").post(PorfileChangePassword);

router
  .route("/update-my-profile")
  .post(isAuthenticatedUser, createUpdateUserProfile);

router
  .route("/upload-avatar")
  .post(isAuthenticatedUser, imageUpload.single("avatar"), updateUserAvatar);

router.route("/delete-avatar").delete(isAuthenticatedUser, deleteUserAvatar);

module.exports = router;
