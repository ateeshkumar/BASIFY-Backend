const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, "Name is required"],
    },
    coursePrice: {
      type: Number,
      required: [true, "price is required"],
    },
    courseLogo:{
        type:String,
        default:""
    },
    courseModule: [
      {
        type: mongoose.Types.ObjectId,
        ref: "courseModule",
      },
    ],
    student: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    batch: [
      {
        type: mongoose.Types.ObjectId,
        ref: "batch",
      },
    ],
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "reviews",
      },
    ],
    rating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

const courseModel = mongoose.model("course", userSchema);

module.exports = courseModel;
