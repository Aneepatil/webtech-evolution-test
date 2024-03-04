import {connect} from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const url = process.env.DEPLOYED_MONGODB_URL 
const port = process.env.PORT||8001

export const dbConnection = async (app) => {
    try {
        const connected = await connect(url);
        // const connected = await connect('mongodb://localhost:27017');
        console.log(`mongoDB Connected ${connected.connection.host}`);
        app?.listen(port, () => console.log(`Server running on port ${process.env.PORT}`));
        
      } catch (error) {
        console.log("Error",error.message)
        process.exit(1);
      }
};