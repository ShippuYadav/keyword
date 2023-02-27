const mongoose = require("mongoose");
const keywordSchema = mongoose.Schema(
    {
        categoryId: {
            type: String,
            required: true
        },
        keyword:[{
            name:{
                type:String
            },
            hiddenKeyword:{
                type:String
            }
        }],
        parentId:{
            type: String,
            default: 0
        },
        createdAt: {
            type: String,
            default:Date.now()
        },
        updatedAt: {
            type: String,
            required:false
        }
    },
    {
        strict: false
    }
)
const keyword = new mongoose.model("keyword",keywordSchema)
module.exports = keyword