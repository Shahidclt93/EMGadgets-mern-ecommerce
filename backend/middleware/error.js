const ErrorHandler = require("../utils/errorhander");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong mongodb id error
    if(err.name == "CastError"){
        const message = `Resource not found. invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    //Mongoose duplicate key enter
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    //Wrong JWT error
    if(err.name === `JsonwebTokenError`){
        const message = `Json web Token is invalid, try again `;
        err = new ErrorHandler(message, 400);
    }
    //WT EXPIRE error
    if(err.name === `TokenExpiredError`){
        const message = `Json web Token is Expired, try again `;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}