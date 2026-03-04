import jwt from "jsonwebtoken";

export function verifyToken(req,res,next){
    try{
        if(!req.headers.authorization){
            return res.status(401).json({message:"Unauthorized"});
        }else{
            jwt.verify(req.headers.authorization.split(" ")[1],"secretkey",(err,data)=>{
                if(err){
                    return res.status(401).json({message:err.message});
                }else{
                    req.user=data;
                    next();
                }
            })
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}