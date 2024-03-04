import express from "express";
import {
  allProperty,
  createProperty,
  deleteProperty,
  singleProperty,
  updateProperty,
} from "../controllers/propertyController.js";

const propertyRoute = express.Router();

propertyRoute.get("/all", allProperty);
propertyRoute.get("/single/:propertyId", singleProperty);
propertyRoute.post("/create", createProperty);
propertyRoute.put("/update/:propertyId", updateProperty);
propertyRoute.delete("/delete/:propertyId", deleteProperty);

export default propertyRoute;
