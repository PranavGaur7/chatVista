const express = require('express');
const { register, login, profile, getAllUsers, isLoggedIn, logout, getUser } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.route('/register')
    .post(register)
userRouter.route('/avatar')
    .post(profile)
userRouter.route('/getUser')
    .post(getUser)
userRouter.route('/login')
    .post(login)
    .get(isLoggedIn)
userRouter.route('/logout')
    .get(logout)
userRouter.route('/allUsers')
    .get(getAllUsers)
module.exports = userRouter;