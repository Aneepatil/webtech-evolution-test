import express from 'express';
import cors from 'cors';
import { dbConnection } from './config/dbConnect.js';
import { globleErrorHandler } from './globalErrorHandler/globleErrorHandler.js';
import categoryRoute from './routes/categoryRoute.js';
import subCategoryRoute from './routes/subCategoryRoute.js';
import propertyRoute from './routes/propertyRoute.js';

// App initialization
const app = express();

// DB configuration Call
dbConnection(app)

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/categories",categoryRoute)
app.use("/api/v1/subCategories",subCategoryRoute)
app.use("/api/v1/properties",propertyRoute)
// Error handler middleware
app.use(globleErrorHandler);

// Page Not found Error(404) handler middleware
app.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} -> Route Not Found`,
  });
});
