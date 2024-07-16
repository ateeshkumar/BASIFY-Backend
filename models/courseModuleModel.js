const mongoose = require("mongoose");
const courseModuleSchema = new mongoose.Schema(
  {
    moduleName: {
      type: String,
      required: [true, "Name is required"],
    },

    moduleDescription: {
      type: String,
      required: [true, "Description"],
    },

    courseSubModule: [
      {
        type: mongoose.Types.ObjectId,
        ref: "courseModule",
      },
    ],
  },
  { timestamps: true }
);

const courseModuleModel = mongoose.model("courseModule", courseModuleSchema);

module.exports = courseModuleModel;
