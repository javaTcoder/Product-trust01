const asyncWrapper = require("../middleWare/asyncWrapper");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");



exports.isAuthentictedUser = asyncWrapper(async (req , res , next) =>{
    const { token } = req.cookies; 

 //   console.log("[AUTH] Token from cookies:", token ? "EXISTS" : "MISSING");
  //  console.log("[AUTH] All cookies:", req.cookies);

    if(!token){
        return next(new ErrorHandler("Please Login to access this resource", 401)); 
    }

    try {
        const deCodeToken = jwt.verify(token, process.env.JWT_SECRET);
       // console.log("[AUTH] Decoded token ID:", deCodeToken.id);

        const user = await userModel.findById(deCodeToken.id); 
       // console.log("[AUTH] User found:", user ? user.email : "NOT FOUND");

        if (!user) {
            return next(new ErrorHandler("User not found for this token", 401));
        }

        req.user = user;
        next();
    } catch (error) {
       // console.error("[AUTH] Token verification failed:", error.message);
        return next(new ErrorHandler("Invalid token", 401));
    }
})


      // taking role as param and converting it into array using spread operator. for using array method
exports.authorizeRoles = (...roles) =>{
 return (req , res , next) =>{
     if (roles.includes(req.user.role) ===false){ 
        return next(
            new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resouce `,
                403)
        )
     }
   
    next();
 }
}  