import express from 'express';
import { allCat, createCat, deleteCat, singleCat, updateCat } from '../controllers/categoryController.js';

const categoryRoute = express.Router()

categoryRoute.get('/all',allCat)
categoryRoute.get('/single/:cat_id',singleCat)
categoryRoute.post('/create',createCat)
categoryRoute.put('/update/:cat_id',updateCat)
categoryRoute.delete('/delete/:cat_id',deleteCat)



export default categoryRoute