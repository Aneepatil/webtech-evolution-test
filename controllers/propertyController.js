import mongoose from "mongoose"
import { Property } from "../models/Property.js"
import { appError } from "../utils/appError.js"

export const createProperty = async(req,res,next)=>{
    try {
        const property = await Property.create(req.body)
        res.status(200).json({success:true,message:"Property created successfully",data:property})
    } catch (error) {
        next(error)
    }
}

export const allProperty = async(req,res,next)=>{
    try {
        const {
            categoryId,
            subCategoryId,
            startDate,
            endDate

          } = req.body;
        
          let filters = {isDeleted: false};
        
          // Add filters based on query parameters
        
          if (categoryId) {
            filters.categoryId = new mongoose.Types.ObjectId(categoryId);
          }

          if (subCategoryId) {
            filters.subCategoryId = new mongoose.Types.ObjectId(subCategoryId);
          }

          if (startDate) {
            filters.availableDates = {
                $elemMatch: {
                    from: {
                        $gte: new Date(startDate),
                    },
                },
            };
        }
        
        if (endDate) {
            filters.availableDates = {
                $elemMatch: {
                    to: {
                        $lte: new Date(endDate),
                    },
                },
            };
        }

        const propertyList = await Property.aggregate([
            {
                $match:{
                    ...filters
                }
            },
            {
                $lookup:{
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoriesDetail"
                }
            },
            {
                $unwind:"$categoriesDetail"
            },
            {
                $lookup:{
                    from: "subcategories",
                    localField: "subCategoryId",
                    foreignField: "_id",
                    as: "subcategoryIdDetail"
                }
            },
            {
                $unwind:"$subcategoryIdDetail"
            },
            {
                $project:{
                    _id:0,
                    propertyName:1,
                    availableDates:1,
                    categoryId:1,
                    categoryName:"$categoriesDetail.name",
                    subCategoryId:1,
                    subcategory:"$subcategoryIdDetail.name",
                    maxGuests:1,
                    isDeleted:1,
                    createdBy:1,
                    updatedBy:1,
                    deletedBy:1
                }
            }
        ])
        if(!propertyList || propertyList.length < 1 ){
            throw next(appError(404, "Property Not Found"));
        }
        res.status(200).json({success:true,message:"Properties Fetched successfully",data:propertyList, total:propertyList.length})
    } catch (error) {
        next(error)
    }
}

export const singleProperty = async(req,res,next)=>{
    try {
        console.log(req.params.property)
        const property = await Property.aggregate([
            {
                $match:{
                    _id: new mongoose.Types.ObjectId(req.params.propertyId) 
                }
            },
            {
                $lookup:{
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetail"
                }
            },{
                $unwind:"$categoryDetail"
            },
            {
                $lookup:{
                    from: "subcategories",
                    localField: "subCategoryId",
                    foreignField: "_id",
                    as: "subcategoryDetail"
                }
            },{
                $unwind:"$subcategoryDetail"
            },{
                $project:{
                    _id:0,
                    propertyName:1,
                    availableDates:1,
                    category:"$categoryDetail.name",
                    subcategory:"$subcategoryDetail.name",
                    maxGuests:1,
                    isDeleted:1,
                    createdBy:1,
                    updatedBy:1,
                    deletedBy:1
                }
            }
        ])
        if(!property || property.length < 1){
            throw next(appError(404, "Property Not Found"));
        }
        res.status(200).json({success:true,message:"Propertie Fetched successfully",data:property})

    } catch (error) {
        next(error)
    }
}

export const updateProperty = async(req,res,next)=>{
    
}

export const deleteProperty = async(req,res,next)=>{
    try {
        const property = await Property.findOneAndUpdate({_id:req.params.propertyId,isDeleted:false},{isDeleted:true},{new:true})
        if(!property){
            throw next(appError(200, "Property Not Found"));
        }
        res.status(200).json({success:true,message:"Properties Deleted successfully"})
    } catch (error) {
        next(error)
    }
}