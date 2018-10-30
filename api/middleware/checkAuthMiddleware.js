const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log(token);
        const decode=jwt.verify(token, process.env.JWTKEY);
        req.userData=decode;
        console.log(decode);
        next();
    }catch(error){
        return res.status(401).json({
            message: "Auth faild token",
            error:error
        });
    }
   
    
}