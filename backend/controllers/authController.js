import { db } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register
export async function register(req, res) {
    try {
        const { name, email, password} = req.body;
        if (!name, !email, !password) {
            return res.status(400).json({ message: "Bad request" });
        }
        else {
            const query = `insert into users(name,email,password,role) values(?,?,?,?)`;

            const hashpass = await bcrypt.hash(password, 10);

            const newrole="USER";

            db.query(query, [name, email, hashpass, newrole], (err, result) => {

                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    return res.status(201).json({ message: "User created", user: result });
                }
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



//login
export  function login(req,res){
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:"All feilds are required"});
        }
        else{
            const query=`select * from users where email=?`;
            db.query(query,[email], async (err,result)=>{
                if(err){
                    return res.status(500).json({message:err.message});
                }
                else{
                    if(result.length===0){
                        return res.status(404).json({message:"user not found"});
                    }
                    else{
                        const user=result[0];
                        const passmatch=await bcrypt.compare(password,user.password);
                        if(!passmatch){
                            return res.status(400).json({message:"wrong password"});
                        }
                        else{
                            console.log(user);
                            const token= jwt.sign({id:user.id,role:user.role},"secretkey",{expiresIn:"1h"});
                            return res.status(201).json({message:"login success",token:token,role:user.role});
                        }
                    }
                }
            })
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
};