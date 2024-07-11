
exports.createjobController = async(req,res)=>{
    try {
        const {title,description,image,url}= req.body;
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            response:false,
            message:"internal server Error",
            error
        });
    }
}