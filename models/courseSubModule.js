const mongoose = require("mongoose");
const courseSubModuleSchema = new mongoose.Schema(
  {
    subModuleName: {
      type: String,
      required: [true, "Name is required"],
    },

    content: {
      type: String,
      default:""
    },

    image: {
      type: String,
      default:""
    },
    
    video: {
      type: String,
      default:""
    },
  },
  { timestamps: true }
);

const courseSubModuleModel = mongoose.model("courseModule", courseSubModuleSchema);

module.exports = courseSubModuleModel;
