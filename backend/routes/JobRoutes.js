const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {createJob, updateJob, updateJobStatus, getAllHrJob, getSingleHrJob, deleteHrJob, getAllJobsPublic, jobApply} = require('../controllers/JobController')


const router = express.Router();

router.route("/create-job").post(isAuthenticatedUser, createJob);

router.route("/update-job/:slug").put(isAuthenticatedUser, updateJob);

router.route("/update-job-status/:slug").put(isAuthenticatedUser, updateJobStatus);

router.route("/get-all-hr-job").get(isAuthenticatedUser, getAllHrJob);

router.route("/get-single-hr-job/:slug").get(isAuthenticatedUser, getSingleHrJob);

router.route("/delete-job/:slug").delete(isAuthenticatedUser, deleteHrJob);

router.route("/get-all-jobs-public").get(getAllJobsPublic)

router.route("/apply-on-job").post(isAuthenticatedUser, jobApply)

module.exports = router