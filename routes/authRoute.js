const express = require('express');
const { userRegistrationController, userLoginController } = require('../controllers/authController');

const authRoute = express.Router();

authRoute.post('/signup',userRegistrationController);

authRoute.post("/login",userLoginController);

module.exports = authRoute;