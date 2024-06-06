import connectDB from './db/index.js'
import dotenv from 'dotenv'
import app from './app.js'
dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT,(req,res)=>{
        console.log(`Server Running for App at PORT: ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection Failure",error);
})