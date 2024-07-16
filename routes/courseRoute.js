const express = require("express");
const { createCourseController, getAllCoursesController, getSingleCoursesController } = require("../controllers/courseController");
const { courseImage } = require("../middleware/uploadImage");

const courseRoute = express.Router()

courseRoute.post('/create',courseImage.single("courseLogo"),createCourseController);

courseRoute.get('/courses',getAllCoursesController);

courseRoute.get('/courses/:id',getSingleCoursesController)


module.exports = courseRoute;