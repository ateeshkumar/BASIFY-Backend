const courseModel = require("../models/courseModel");

exports.createCourseController = async(req,res)=>{
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