const express = require('express');
const { createContactusController, getAllContactusController, getSingleContactusController } = require('../controllers/contactUsController');

const constact = express.Router();


constact.post('/create',createContactusController);

constact.get('/all',getAllContactusController);

constact.get('/contact/:id',getSingleContactusController);

module.exports = constact;