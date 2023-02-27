const BulkUpload = require("../models/BulkImageUpload");

const uploadBulkImage = async(req,res) =>{
    console.log(req.files.length);
    if (req.files) {
        const images = [];
        if (Array.isArray(req.files)) {
            for (let a = 0; a < req.files.length; a++) {
                images.push(req.files[a].filename)
            }
            // console.log(images);
        }else{
            images.push(req.files[0].filename)
        }
        var data = new BulkUpload({
            folderId:req.body.folderId,
            "images.name":req.files
        })
        const insertData = await data.save();
        if (insertData) {
            res.send({data:data,status:200,message:"success"}); 
        }else{
            res.send({data:data,status:404,message:"failed"}); 
        }
    }
}

// Get keyword by Category id
const getKeywordByCtgId = async(req,res) => {
    try{
        var data = await Keyword.find({category_id:req.params.categoryId})
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
module.exports = {uploadBulkImage,getKeywordByCtgId}
