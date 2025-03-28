const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/paswordEncryption");
const JWT = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

exports.userRegistrationController = async(req,res)=>{
    try {
        const {name,email,password,phone,role} = req.body;
        if(!name || !email || !password || !phone ){
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

//get all users
exports.getAlluserDetails = async(req,res)=>{
    try {
        const data = await userModel.find();
        return res.status(200).send({
            response:true,
            message:"All user fetch successfully",
            data:data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            response:false,
            message:"internal server Error",
            error
        })
    }
}

//get single user

exports.getSingleUserController = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await userModel.findById(id);
        return res.status(200).send({
            response:true,
            message:"All user fetch successfully",
            data:data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            response:false,
            message:"internal server Error",
            error
        })
    }
}


//forgot password controller

exports.postForgotPasswordController = async(req,res)=>{
    try {
        const transporter = nodemailer.createTransport({
            service:'Gmail',
            auth: {
              user: 'basify.org@gmail.com',
              pass: 'Basify@12345',
            }
          });
        
        const {email} = req.body;

        const user = userModel.findOne({email});

        if (!user) {
            return res.status(404).send({response:false, message: 'User not found' });
        }

        // Generate OTP
        const otp = otpGenerator.generate(6, { digits: false, alphabets: true, upperCase: true, specialChars: false });

        // Save OTP (you might store this in your database against the user for verification)
        user.otp = otp;

        // Send OTP to user's email
        const mailOptions = {
            from: 'noreply@basify.org',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.log(error);
            return res.status(500).send({ response:false, message: 'Failed to send email' });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).send({response:true, message: 'OTP sent to your email' });
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