// const mongoose = require("mongoose");
// const bulkImageSchema = new mongoose.Schema(
//     {
//         folderId:{
//             type:String,
//             unique:true,
//             required:true
//         },
//         images:Array
//     }
// )
// const bulkImageUpload = new mongoose.model("bulkImageSchema",bulkImageSchema)
// module.exports = bulkImageUpload
const mongoose = require("mongoose");
const bulkImageSchema = new mongoose.Schema(
    {
        folderId:{
            type:String,
            unique:true,
            required:true
        },
        images:[{
            type:String,
            name:{
                type:String
            }
        }]
       
        
    }
)
const bulkImageUpload = new mongoose.model("bulkImageSchema",bulkImageSchema)
module.exports = bulkImageUpload