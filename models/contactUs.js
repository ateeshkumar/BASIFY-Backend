const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "price is required"],
    },
    message:{
        type:String,
        default:""
    },
  },
  { timestamps: true }
);

const contactModel = mongoose.model("contact", contactSchema);

module.exports = contactModel;
