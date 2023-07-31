const express = require("express");
const {Logger, shield} = require("../middlewares/logger")


const{getCategories,getCategory,createCategory,updateCategory,deleteCategory}=require("../controller/catergoryController")
const router=express.Router();

router.route("/").get(getCategories).post(shield,Logger, createCategory)

router.route("/:id").get(getCategory).put(shield,Logger, updateCategory).delete(shield,Logger, deleteCategory)


module.exports=router;