import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema= new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //Cloudinary se ayega heavy hota hh
            required:true
        },
        coverImage:{
            type:String
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,'Password Required']
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

//"Pre" Hook just before saving data use this to HASH password
// Next is liye h ki apna kaam krene k bad Middleware aage wale ko falg paas kr dega
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

//Add methons in the Schema to perform Tasks like validate passwords
userSchema.methods.isPassordCorrect =async function(password){
    return await bcrypt.compare(password,this.password)
}


//GENERATING Tokens for cookies and REFRESHING Tokens
userSchema.methods.generateAccessToken=  function(){
    return  jwt.sign(
        {
            _id:this._id, //This to add and create as tokens using the info in Schema
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=  function(){
    return  jwt.sign(
        {
            _id:this._id,  //This to add and create as tokens using the info in Schema and This uses less info to keep it light as it refreshes
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User=mongoose.model("User",userSchema);