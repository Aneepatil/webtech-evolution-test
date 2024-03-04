import { createSlug } from "../helper.js/helper.js"
import { Category } from "../models/Category.js"
import { SubCategory } from "../models/SubCategory.js"
import { appError } from "../utils/appError.js"

export const createSubCat = async(req,res,next)=>{
    try {

        const slug = await createSlug(req.body.name)

        // Check if Sub category exist before creating
        const subCategory = await SubCategory.findOne({slug,categoryId:req.body.categoryId})
        if(subCategory){
            throw next(appError(400,"Sub-Category already exists"))
        }

        // Create a new Sub category
        const newSubcat = await SubCategory.create({name:req.body.name, slug})
        res.status(200).json({success:true,message:"Sub Category created successfully"})
    } catch (error) {
        next(error)
    }
}

export const allSubCat = async(req,res,next)=>{
    try {
        const subCategories = await SubCategory.find({isDeleted:false})
        if(subCategories.length === 0){
            throw res.status(200).json({success:true,message:"Data Not Found"})
        }
        res.status(200).json({success:true,message:"Categories Fetched successfully",data:subCategories})
    } catch (error) {
        next(error)
    }
}

export const singleSubCat = async(req,res,next)=>{
    try {
        const subCategory = await SubCategory.findOne({_id: req.params.subCat_id})
        if(!subCategory){
            throw next(appError(404, "Category Not Found"))
        }
        res.status(200).json({success:true,message:"Categories Fetched successfully",data:subCategory})
    } catch (error) {
        next(error)
    }
}

export const updateSubCat = async(req,res,next)=>{
    try {       
        const slug = await createSlug(req.body.name) 
        const updatedSubCategory = await SubCategory.findOneAndUpdate({_id:req.params.subCat_id},{name:req.body.name,slug},{new:true})
        if(!updatedSubCategory) throw next(appError(404, "Sub Category Not Found"))
        res.status(200).json({success:true,message:"Categories Fetched successfully",data:updatedSubCategory})
    } catch (error) {
        next(error)
    }
}

export const deleteSubCat = async(req,res,next)=>{
    try {       
        const updatedCategory = await SubCategory.findOneAndUpdate({_id:req.params.subCat_id,isDeleted:false},{isDeleted:true},{new:true})
        if(!updatedCategory) throw next(appError(404, "Category Not Found"))
        res.status(200).json({success:true,message:"Category Deleted successfully",})
    } catch (error) {
        next(error)
    }
}