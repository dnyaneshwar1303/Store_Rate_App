import { db } from "../models/userModel.js";
import bcrypt from "bcrypt";

// update password
export async function updatePassword(req,res){
    try{
        const {password}=req.body;
        const id=req.user.id;
        if(!password){
            return res.status(400).json({message:"all feilds are required"});
        }
        else{
            const hasspass=await bcrypt.hash(password,10);
            const query=`update users set password=? where id=?`;
            db.query(query,[hasspass,id],(err,result)=>{
                if(err){
                    return res.status(500).json({message:err.message});
                }
                else{
                    if(result.affectedRows===0){
                        return res.status(404).json({message:"no user to update"});
                    }
                    else{
                        return res.status(201).json({message:"password updated"});
                    }
                }
            })
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
};