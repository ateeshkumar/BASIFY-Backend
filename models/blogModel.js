const mongoose =  require("mongoose");
const blogSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        required:[true,"id is required"],

    },
    title:{
        type:String,
        required:[true,"Phone is required"],
    },
    image:{
        type:String,
        default:""
    },
    content:{
        type:String,
        default:null,
    }
},{timestamps:true});

const blogModel=  mongoose.model("Blog", blogSchema);

module.exports = blogModel;