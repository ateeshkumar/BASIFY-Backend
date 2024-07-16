const courseModel = require("../models/courseModel");

exports.createCourseController = async(req,res)=>{
    try {
        const {courseName,coursePrice} = req.body;
        const courseLogo = req.file ? req.file.filename : "";
        if(!courseName || !coursePrice){
            return res.status(400).send({
                response:false,
                message:"Fill required field"
            })
        }
        const course = new courseModel({courseName,coursePrice,courseLogo});
        await course.save();

        return res.status(200).send({
            response:true,
            message:'Created Successfully',
            data:course
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            response:false,
            message:'Internal server error',
            error
        })
    }
}

exports.createCourseModuleController = async(req,res)=>{
    try {
        const {courseName,coursePrice,courseLogo} = req.body;
        if(!courseName || !coursePrice){
            return res.status(400).send({
                response:false,
                message:"Fill required field"
            })
        }
        const course = new courseModel({courseName,coursePrice,courseLogo});
        await course.save();

        return res.status(200).send({
            response:true,
            message:'Created Successfully',
            data:course
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            response:false,
            message:'Internal server error',
            error
        })
    }
}

//get all courses access

exports.getAllCoursesController = async(req,res)=>{
    try {
        const data = await courseModel.find();
        return res.status(200).send({
            response:true,
            message:'Courses fetch Successfully',
            data:data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            response:false,
            message:'Internal server error',
            error
        })
    }
}

//get single course details
exports.getSingleCoursesController = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await courseModel.findById(id);
        return res.status(200).send({
            response:true,
            message:'Courses fetch Successfully',
            data:data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            response:false,
            message:'Internal server error',
            error
        })
    }
}