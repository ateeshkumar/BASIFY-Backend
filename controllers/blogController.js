const { response } = require("express");
const blogModel = require("../models/blogModel");

exports.createBlogController = async(req,res)=>{
    try {
        const {user,title,content} = req.body;
        if(!user || !title || !content){
            return res.status(400).send({
                response:false,
                message:"all fields are required"
            })
        }
        const data = new blogModel({user,title,content});
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