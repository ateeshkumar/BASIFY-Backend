const express = require('express');
const { createBlogController, getAllBlogController, getSingleBlogById, deleteBlogController } = require('../controllers/blogController');
const { blogImage } = require('../middleware/uploadImage');

const blogRoute = express.Router();

blogRoute.post('/create',blogImage.single('image'),createBlogController);

blogRoute.get('/blog', getAllBlogController);

blogRoute.get('/blog/:id',getSingleBlogById);

blogRoute.delete('/delete/:id',deleteBlogController)


module.exports = blogRoute;