const express = require('express');
const { userRegistrationController, userLoginController, getAlluserDetails } = require('../controllers/authController');

const authRoute = express.Router();

authRoute.post('/signup',userRegistrationController);

authRoute.post("/login",userLoginController);

authRoute.get('/user', getAlluserDetails);

module.exports = authRoute;