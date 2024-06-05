import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'
const connectDB= async ()=>{
    try {
        const connection=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected !! \nHost: ${connection.connection.host} \nPORT: ${process.env.PORT}`)
    } catch (error) {
        console.log("MongoDB cenncetion Error",error);
        process.exit(1);
    }
}

export default connectDB