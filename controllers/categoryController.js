import { createSlug } from "../helper.js/helper.js"
import { Category } from "../models/Category.js"
import { appError } from "../utils/appError.js"

export const createCat = async(req,res,next)=>{
    try {
        const slug = await createSlug(req.body.name)
        const category = await Category.findOne({slug})
        if(category){
            throw next(appError(400,"Category already exists"))
        }
        const newCategory = await Category.create({name:req.body.name, slug})
        res.status(200).json({success:true,message:"Category created successfully"})
    } catch (error) {
        next(error)
    }
}   

export const allCat = async(req,res,next)=>{
    try {
        const categories = await Category.find({isDeleted:false})
        if(categories.length === 0){
            throw res.status(200).json({success:true,message:"Data Not Found"})
        }
        res.status(200).json({success:true,message:"Categories Fetched successfully",data:categories})
    } catch (error) {
        next(error)
    }
}

export const singleCat = async(req,res,next)=>{
    try {
        const category = await Category.findOne({_id: req.params.cat_id})
        if(!category){
            throw next(appError(404, "Category Not Found"))
        }
        res.status(200).json({success:true,message:"Categories Fetched successfully",data:category})
    } catch (error) {
        next(error)
    }
}

export const updateCat = async(req,res,next)=>{
    try {       
        const slug = await createSlug(req.body.name) 
        const updatedCategory = await Category.findOneAndUpdate({_id:req.params.cat_id},{name:req.body.name,slug},{new:true})
        if(!updatedCategory) throw next(appError(404, "Category Not Found"))
        res.status(200).json({success:true,message:"Categories Fetched successfully",data:updatedCategory})
    } catch (error) {
        next(error)
    }
}

export const deleteCat = async(req,res,next)=>{
    try {       
        const updatedCategory = await Category.findOneAndUpdate({_id:req.params.cat_id},{isDeleted:true},{new:true})
        if(!updatedCategory) throw next(appError(404, "Category Not Found"))
        res.status(200).json({success:true,message:"Category Deleted successfully",})
    } catch (error) {
        next(error)
    }
}