import express from 'express';
import { allSubCat, createSubCat, deleteSubCat, singleSubCat, updateSubCat } from '../controllers/subCategoryController.js';

const subCategoryRoute = express.Router()

subCategoryRoute.get('/all',allSubCat)
subCategoryRoute.get('/single/:subCat_id',singleSubCat)
subCategoryRoute.post('/create',createSubCat)
subCategoryRoute.put('/update/:subCat_id',updateSubCat)
subCategoryRoute.delete('/delete/:subCat_id',deleteSubCat)



export default subCategoryRoute