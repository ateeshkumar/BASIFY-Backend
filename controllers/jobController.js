const jobModel = require("../models/jobModel");

exports.createjobController = async(req,res)=>{
    try {
        const {title,description,url}= req.body;
        const image = req.file ? req.file.filename : "";
        if(!title || !description || !url){
            return res.status(403).send({
                response:false,
                message:"All Fields Required",
            })
        }
        const data = new jobModel({title,description,image,url});
        await data.save();
        return res.status(200).send({
            response:false,
            message:"Data Created Successfully",
            data:data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            response:false,
            message:"internal server Error",
            error
        });
    }
}


//get all job

exports.getAlljobController = async(req,res)=>{
    try {
        const data = await jobModel.find();
        return res.status(200).send({
            response:true,
            message:"job fetch successfully",
            data:data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            response:false,
            message:"internal server Error",
            error
        });
    }
}


//get job details controller
exports.getSinglejobController = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await jobModel.findById(id);
        return res.status(200).send({
            response:true,
            message:"job fetch successfully",
            data:data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            response:false,
            message:"internal server Error",
            error
        });
    }
}

//deactivate the job 

exports.deactivatejobController = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await jobModel.findByIdAndUpdate(
            id,
            {
            $set: { status: "deactive" },
          },
          { new: true });

        return res.status(200).send({
            response:true,
            message:"job deactivate successfully",
            data:data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            response:false,
            message:"internal server Error",
            error
        });
    }
}

//delete the job controller

exports.deletejobController = async(req,res)=>{
    try {
        const {id} = req.params;
        await jobModel.findByIdAndDelete(id);
        return res.status(200).send({
            response:true,
            message:"Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            response:false,
            message:"internal server Error",
            error
        });
    }
}