const { default: mongoose } = require("mongoose");
const courseModel = require("../models/courseModel");
const courseModuleModel = require("../models/courseModuleModel");
const { courseSubModuleImage } = require("../middleware/uploadImage");

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
        const {id} = req.params;
        const {moduleName,moduleDescription} = req.body;
        if(!moduleName || !moduleDescription){
            return res.status(400).send({
                response:false,
                message:"Fill required field"
            })
        }
        const course = await courseModel.findById(id)
        const module = new courseModuleModel({moduleName,moduleDescription});
        await module.save();
        const session = await mongoose.startSession();
        session.startTransaction();
        course.courseModule.push(module);
        await course.save({session})
        await session.commitTransaction();
        return res.status(200).send({
            response:true,
            message:'Created Successfully',
            data:module
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

//create sub module course
exports.createCourseSubModuleController = async(req,res)=>{
    try {
        const {id} = req.params;
        const {subModuleName,content,} = req.body;
        const image = req.file ? req.file.filename : "";
        const video = req.file ? req.file.filename : "";
        // const coursemodule = await courseModuleModel.findById(id)
        const submodule = new courseSubModuleImage({subModuleName,content,image,video});
        await submodule.save();
        // const session = await mongoose.startSession();
        // session.startTransaction();
        // coursemodule.courseSubModule.push(submodule);
        // await coursemodule.save({session})
        // await session.commitTransaction();
        return res.status(200).send({
            response:true,
            message:'Created Successfully',
            data:module
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
