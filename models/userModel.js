const mongoose =  require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],

    },
    phone:{
        type:String,
        required:[true,"Phone is required"],
    },
    role:{
        type:Number,
        default:0,
    }
},{timestamps:true});

const userModel=  mongoose.model("User", userSchema);

module.exports = userModel;