
//Using Promises
const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((error)=>next(error))
    }
}




export default asyncHandler
//Higher Order Fumction that accepts function as a parameter and can return a Function

// Example

// const asyncHandler = (func)=>{ async (req,res,next)=>{
//     try {
        
//         await func(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }}


