
import  { Request, NextFunction,Response } from 'express'
import ErrorHandler from '../utils/utility-class.js';
import { ControllerType } from '../types/types.js';



export const errorMiddleware = ((err:ErrorHandler, req:Request, res:Response, next:NextFunction)=>{

    if(err.name === "CastError") err.message = "Invalid ID"
    err.message ||= "Internal Server Error";
    err.stateCode ||= 500;

    return res.status(err.stateCode).json({
        success:false,
        message:err.message,
    })
})

export const TryCatch = (func:ControllerType) => (req:Request,res:Response,next:NextFunction) =>{
         return Promise.resolve(func(req,res,next)).catch(next);
    
};

