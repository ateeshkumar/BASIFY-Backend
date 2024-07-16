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