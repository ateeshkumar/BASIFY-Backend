const { response } = require("express");
const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/paswordEncryption");
const JWT = require('jsonwebtoken');

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


// user Login Controller

exports.userLoginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password ){
            return res.status(400).send({
                response:false,
                message:"All fields required"
            })
        }
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(403).send({
                response:false,
                message:'User Not Registerd'
            })
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(403).send({
                response:false,
                message:'Incorrect password'
            })
        }
        const token = await JWT.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:'400h'});
        return res.status(200).send({
            response:true,
            message:'User login successfully',
            data:user,
            token:token
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