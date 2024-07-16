const express = require('express');
const { jobImage } = require('../middleware/uploadImage');
const { createjobController, getAlljobController, getSinglejobController, deactivatejobController, deletejobController } = require('../controllers/jobController');

const jobRoute = express.Router();

jobRoute.post('/create',jobImage.single('image'),createjobController);

jobRoute.get('/job',getAlljobController);

jobRoute.get('/job/:id',getSinglejobController);

jobRoute.put('/deactivate/:id',deactivatejobController);

jobRoute.delete('/delete/:id',deletejobController);

module.exports = jobRoute;
