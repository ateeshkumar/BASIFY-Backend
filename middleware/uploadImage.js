const multer = require("multer");
const path = require("path");

const courseStorage = multer.diskStorage({
  destination: "./uploads/course",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const blogStorage = multer.diskStorage({
  destination: "./uploads/blog",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const jobsStorage = multer.diskStorage({
  destination: "./uploads/job",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.courseImage = multer({ storage: courseStorage });
exports.blogImage = multer({ storage: blogStorage });
exports.jobImage = multer({ storage: jobsStorage });
