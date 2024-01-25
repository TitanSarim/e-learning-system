const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {createUser, loginUser, createNewUser, updateUser, getAllUsers, getSingleUser, deleteUser, logout} = require('../controllers/userController')


const router = express.Router();


router.route("/register").post(createUser, isAuthenticatedUser)

router.route('/loggedIn').post(loginUser, isAuthenticatedUser)

router.route('/logout').get(logout)

router.route("/create/user").post(isAuthenticatedUser, createNewUser)

router.route('/update/user/:userId').put(isAuthenticatedUser, updateUser)

router.route('/getAll/users').get(isAuthenticatedUser, getAllUsers)

router.route('/getSingle/user/:userId').get(isAuthenticatedUser, getSingleUser)

router.route('/delete/user/:userId').delete(isAuthenticatedUser, deleteUser)


module.exports = router