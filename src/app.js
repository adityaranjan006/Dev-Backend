import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
})); //Options bhi available hai


//Json parser middleware
app.use(express.json({
    limit:"16kb"
}));

//encoded URL middleware
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}));

// Serving static files In Static middleware
app.use(express.static("public"));

//Allow app to use and se cookies
app.use(cookieParser());

export default app