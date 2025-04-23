import { errorHandler, successHandler } from "../utills/responseHandle.js";
import pkg from "jsonwebtoken"

const {verify} = pkg


export const checkToken = (req,res,next) =>{
    console.log(req.headers.authorization);

    if(!req?.headers?.authorization) return errorHandler(res,404,"token not found")

    next()
    
    

}
