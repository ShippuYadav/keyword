const User = require("../models/User");

const login = async(req,res) => {
    try{   
        const {email,password} = req.body 
        const data = await User.findOne({email:email, password:password}) 
        if (data) {
            return res.status(200).json({
                message: "Login successfully",
                status: 200
            });
        }else{
            return res.status(404).json({
                message: "Invalid credential",
                status: 404
            });
        }
    }   
    catch(error){
        console.log(error)
        res.status(404).json(error)
    }
}

exports.login = login