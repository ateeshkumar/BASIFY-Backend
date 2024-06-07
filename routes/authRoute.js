const express = require('express');
const { userRegistrationController } = require('../controllers/authController');

const authRoute = express.Router();

authRoute.post('/signup',userRegistrationController);


module.exports = authRoute;