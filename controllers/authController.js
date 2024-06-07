const { response } = require("express");
const userModel = require("../models/userModel");
const { hashPassword } = require("../utils/paswordEncryption");

exports.userRegistrationController = async(req,res)=>{
    try {
        const {name,email,password,phone,role} = req.body;
        if(!name || !email || !password || !phone || !role){
            return res.status(400).send({
                response:false,
                message:"All fields required"
            })
        }
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(403).send({
                response:false,
                message:'User already registerd'
            })
        }
        const ecrPassword = await hashPassword(password);

        const newUser = new userModel({name,email,phone,password:ecrPassword,role});

        await newUser.save()
        
        return res.status(200).send({
            response:true,
            message:'User registerd successfully',
            data:newUser
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            response:false,
            message:"internal server Error",
            error
        })
    }
}