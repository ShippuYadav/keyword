const express = require("express");
const mongoose = require("mongoose");
const User = require("./controller/User");
const categories = require("./controller/CategoryController")
const keyword = require("./controller/Keyword");
const BulkUpload = require("./controller/BulkImageUploadController");
const upload = require('./helper/multer')
const app = express();

app.use(express.json())

// DB CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/keyword",
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => {
      console.log('Connected to MongoDB');
});

app.post('/admin/login',User.login)

//Categories
app.post('/categories/add', categories.addCategory)
app.get('/categories/get', categories.getCategories)
app.get('/categories/get/:_id', categories.getCategoriesById)

// Keywords
app.post('/keyword/addkeyword',keyword.addKeyword)
app.get('/keyword/getAllKeyword',keyword.getAllKeyword)
app.get('/keyword/:categoryId',keyword.getKeywordByCtgId)

// Bulk Image Upload
app.post("/bulkUpload",upload.array('images'),BulkUpload.uploadBulkImage);

const port=3000;

app.listen(port, function() {
    console.log("Server is listening at port:" + port);
});

