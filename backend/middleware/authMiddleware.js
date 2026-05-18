const User = require("../models/Users");
const jwt = require("jsonwebtoken");

module.exports = authMiddleware = async(req,res,next)=>{

    try{
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
          ) {
    
            token =
              req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(
              token,
              process.env.JWT_SECRET
            );
    
            // FIND USER
            req.user = await User.findById(
              decoded.id
            ).select("-password");
    
            next();
    
          } else {
            return res.status(401).json({
                message: "Not authorized, no token",
              });
          }
    
    }
    catch(error){
        return res.status(401).json({
            message: "Not authorized, token failed",
          });
    }
}