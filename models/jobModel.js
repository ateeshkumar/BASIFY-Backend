const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    url:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Active"
    }
}, { timestamps: true });

const jobModel = mongoose.model('Job',jobSchema);

module.exports = jobModel;