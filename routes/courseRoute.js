const express = require("express");
const { createCourseController } = require("../controllers/courseController");
const { courseImage } = require("../middleware/uploadImage");

const courseRoute = express.Router()

courseRoute.post('/create',courseImage.single("courseLogo"),createCourseController);

module.exports = courseRoute;