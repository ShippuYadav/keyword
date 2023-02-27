const Keyword = require("../models/Keyword");

const addKeyword = async(req,res) =>{
    try{
        console.log(req.body)
        var data = new Keyword({
            categoryId:req.body.categoryId,
            keyword:req.body.keyword,
            parentId:req.body.parentId
        })
        const checkExist = await Keyword.findOne({
            categoryId:data.categoryId,
            keyword:{
                $elemMatch: {
                    name:req.body.keyword[0].name
                }
            }
        });
        
        if (!checkExist) {
            await data.save();
            res.send({data:data,status:200,message:"success"}); 
        }
        else{
            const updateData = await Keyword.findOneAndUpdate(
                {
                    categoryId:data.categoryId,
                    keyword:{ $elemMatch: {
                        name:req.body.keyword[0].name
                    }}
                },
                req.body,{
                    new:true
            })
            if(updateData){
                res.send({status:200,message:"Updated successfully"}).status(200); 
            }else{
                res.send({status:404,message:"Already exist"}).status(404); 
            }
        }
    }catch(error){
        console.log(error)
        res.send({status: 500,result:"Failed"}); 
    }
}
// Get AllKeyword
const getAllKeyword = async(req,res) => {
    try{
        var data = await Keyword.find()
        res.send(
            {
                data:data,
                status:200,
                message:"success"
            }
        )
    }catch(error){
        res.send(
            {
                status: 500,
                message: error
            }
        )
    }
}
// Get keyword by Category id
const getKeywordByCtgId = async(req,res) => {
    try{
        console.log(req.params.categoryId);
        var data = await Keyword.find({categoryId:req.params.categoryId},{"keyword.name":1})
        console.log(data);
        if (data) {
            res.send(
                {
                    data:data,
                    status:200,
                    message:"success"
                }
            )
        }else{
            res.send(
                {
                    status:404,
                    message:"failed",
                    data:"Category Id is not valid"
                }
            )
        }
    }catch(error){
        res.send(
            {
                status:500,
                message:"failed",
                data:"Internal server error"
            }
        )
    }
}
module.exports = {addKeyword, getAllKeyword, getKeywordByCtgId};


