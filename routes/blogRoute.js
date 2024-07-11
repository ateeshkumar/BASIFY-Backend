const express = require('express');
const { createBlogController } = require('../controllers/blogController');

const blogRoute = express.Router();

blogRoute.post('/create',createBlogController)

module.exports = blogRoute;