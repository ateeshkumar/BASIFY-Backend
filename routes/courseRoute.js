const express = require("express");
const { createCourseController, getAllCoursesController, getSingleCoursesController, createCourseModuleController, createCourseSubModuleController } = require("../controllers/courseController");
const { courseImage, courseSubModuleImage } = require("../middleware/uploadImage");

const courseRoute = express.Router()

courseRoute.post('/create',courseImage.single("courseLogo"),createCourseController);

courseRoute.get('/courses',getAllCoursesController);

courseRoute.get('/courses/:id',getSingleCoursesController)

courseRoute.post('/createModule/:id',createCourseModuleController)

courseRoute.post('/create-sub-module/:id',courseSubModuleImage.fields([{name:"image",maxCount:1},{name:"video",maxCount:1}]),createCourseSubModuleController)

module.exports = courseRoute;