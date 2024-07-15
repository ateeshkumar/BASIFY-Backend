const express = require('express');
const { userRegistrationController, userLoginController, getAlluserDetails, getSingleUserController, postForgotPasswordController } = require('../controllers/authController');

const authRoute = express.Router();

authRoute.post('/signup',userRegistrationController);

authRoute.post("/login",userLoginController);

authRoute.get('/user', getAlluserDetails);

authRoute.get('/user/:id',getSingleUserController);

authRoute.post('/forgot-password', postForgotPasswordController)

module.exports = authRoute;