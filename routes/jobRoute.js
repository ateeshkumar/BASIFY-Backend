const express = require('express');
const { jobImage } = require('../middleware/uploadImage');
const { createjobController } = require('../controllers/jobController');

const jobRoute = express.Router();

jobRoute.post('/create',jobImage.single('image'),createjobController);

module.exports = jobRoute;
