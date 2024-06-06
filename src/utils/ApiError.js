
//Error class changes according to requirments using NODEJs "Error Class"
class ApiError extends Error{
    constructor(statusCode, message="Something Went Worng",errors=[],stack=""){
        super(message)
        this.statusCode=statusCode;
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors
        
        //Stack hai ya ni Hai
        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default ApiError