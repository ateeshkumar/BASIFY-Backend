const express = require("express");
const { createCourseController } = require("../controllers/courseController");

const courseRoute = express.Router()

courseRoute.post('/create',createCourseController);

module.exports = courseRoute;