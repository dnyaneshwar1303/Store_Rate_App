import { db } from "../models/userModel.js";
import bcrypt from "bcrypt";


//dashboard
export function dashboardstats(req,res){
    try{
        const quert=`select
                       (select count(*) from users) as total_users,
                       (select count(*) from stores) as total_stores,
                       (select count(*) from ratings) as total_ratings`;
                
        db.query(quert,(err,result)=>{
            if(err){
                return res.status(500).json({message:err.message});
            }
            else{
                if(result.length===0){
                    return res.status(404).json({message:"Nothing to show"});
                }
                else{
                    return res.status(200).json({data:result});
                }
            }
        })
    }catch(err){
        return res.status(500).json({message:err.message});
    }
};


// create new user
export async function createUser(req,res){
    try{
        const {name,email,password,role}=req.body;
        if(!name||!email||!password||!role){
            return res.status(400).json({message:"all feilds are required"});
        }
        else{
            const hashpass=await bcrypt.hash(password,10);
            const query=`insert into users(name,email,password,role) values (?,?,?,?)`;
            db.query(query,[name,email,hashpass,role],(err,result)=>{
                if(err){
                    return res.status(500).json({message:err.message});
                }
                else{
                    return res.status(201).json({message:"user added"});
                }
            })
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
};


// get all users

export function getUsers(req,res){
    try{
        const query=`select * from users`;
        db.query(query,(err,result)=>{
            if(err){
                return res.status(500).json({message:err.message});
            }
            else{
                if(result.length===0){
                    return res.status(404).json({message:"No users to show"});
                }
                else{
                    return res.status(200).json({users:result});
                }
            }
        })
    }catch(err){
        return res.status(500).json({message:err.message});
    }
};

export function StoresDetails(req, res) {
    try {
        const query = `select s.name as store_name,u.name as owner_name, 
                       u.email as owner_email, s.address as store_address, 
                       avg(r.rating) as avg_rating from  stores s inner join users u 
                       on u.id=s.owner_id left join ratings r on r.store_id=s.store_id group by s.store_id;`

        db.query(query,(err,result)=>{{
            if(err){
                return res.status(500).json({message:err.message});
            }
            else{
                if(result.length===0){
                    return res.status(204).json({message:"No stores to show"});
                }
                else{
                    return res.status(201).json({stores:result});
                }
            }
        }})
    }catch(err){
        return res.status(500).json({message:err.message});
    }
};