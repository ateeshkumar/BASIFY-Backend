const contactModel = require("../models/contactUs");


//create contact form controller

exports.createContactusController = async (req,res)=>{
    try {
        const {name,email,message} = req.body;
        if(!name || !email || !message){
        return res.status(403).send({
            response:false,
            message:'All fields Are Required',
        });
        }
        const data = new contactModel({name,email,message});
        await data.save();
        return res.status(200).send({
            response:true,
            message:'Sent Successfully',
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

// get all contact form details controller

exports.getAllContactusController = async (req,res)=>{
    try {
        const data = await contactModel.find();
        return res.status(200).send({
            response:true,
            message:'get Successfully',
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

/// get single contact form controller

exports.getSingleContactusController = async (req,res)=>{
    try {
        const {id} = req.params;
        const data = await contactModel.findById(id);
        return res.status(200).send({
            response:true,
            message:'get Successfully',
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