const { response } = require("express");
const blogModel = require("../models/blogModel");

exports.createBlogController = async(req,res)=>{
    try {
        const {user,title,content} = req.body;
        const image = req.file ? req.file.filename : "";
        if(!user || !title || !content){
            return res.status(400).send({
                response:false,
                message:"all fields are required"
            })
        }
        const data = new blogModel({user,title,image,content});
        await data.save();
        return res.status(200).send({
            response:true,
            message:"Blog Created successfully",
            data
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

//get all blog 

exports.getAllBlogController = async(req,res)=>{
    try {
        const data = await blogModel.find();
        return res.status(200).send({
            response:true,
            message:"Blog Get Successfully",
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

//get single blog

exports.getSingleBlogById = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await blogModel.findById(id);
        return res.status(200).send({
            response:true,
            message:"Blog Get Successfully",
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

//delete blog controller\

exports.deleteBlogController = async(req,res)=>{
    try {
        const {id} = req.params;
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(200).send({
                response:flase,
                message:"Blog not found!!",
            })
        }
        const data = await blogModel.findByIdAndDelete(id);
        return res.status(200).send({
            response:true,
            message:"Blog Delete Successfully",
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