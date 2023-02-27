const Category = require("../models/Category");
const addCategory = async(req,res) =>{
  const {name} = req.body;
  let category;
  try{
      const checkExist = await Category.findOne({name:name})
      console.log(checkExist);
      if (!checkExist) {
          category = new Category(req.body)
          await category.save();
          if (category) {
            return res.status(200).json({category})
          }else
            return res.status(404).json({message:"Unable to add"})
      }else{
        return res.status(404).json({message:"This category already exist"})
      }
     
  }catch(error){
      return res.status(500).json({message:"Internal server error"})
  }
}
// Get Categories
const getCategories = async (req, res) => {
  try {
    let categories;
    categories = await Category.find()
    res.status(200).json({ data: categories })
  }
  catch (error) {
    res.status(404).json({ mssage: "No result found" })
  }
}
// Get Categories By Id 
const getCategoriesById = async(req,res) => {
    try{
      console.log(req.params._id);
      const data = await Category.findOne({_id:req.params._id});
      if (data) {
        res.status(200).send({result:"Done",data:data})
      }else{
        res.status(404).send({result:"Failed",message:"Invalid Id"})
      }
    }catch(error){
      res.status(500).send({result:"Failed",message:"Internal Server error"})
    }
}
module.exports = {addCategory,getCategories,getCategoriesById};