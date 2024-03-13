const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { createCourse } = require("../controllers/CourseController");
const { imageUpload } = require("../middleware/imageUpload");
const { filesUpload } = require("../middleware/videoUpload");

const router = express.Router();

router.route("/createCourse").post(isAuthenticatedUser, createCourse);

module.exports = router;

// imageUpload.single('thumbnailFile'),

// filesUpload.fields([{
//     name: "videoFile",
//     maxCount: 100,
// }]),
