const multer = require('multer');
const path = require('path');
const fs = require("fs");
const BulkUpload = require("../models/BulkImageUpload");

var storage = multer.diskStorage({
    destination:async function (req, file, callback){
        folderId = req.body.folderId;
        checkExistence = await BulkUpload.findOne({
            folderId:req.body.folderId,
        });
        if (!checkExistence) {
            var dir = `./uploads/${folderId}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
            var dir = `./uploads/${folderId}`;
            callback(null,dir);
        }else{
            var dir = `./uploads/${folderId}`;
        }
    },
    filename: function(req, file, callback) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null,fileName);
    },
});
const upload = multer({storage:storage});
module.exports = upload;
