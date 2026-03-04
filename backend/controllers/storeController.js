import { db } from "../models/userModel.js";


export function createStore(req,res){
    try{
        const {name,address}=req.body;
        if(!name||!address){
            return res.status(400).json({message:"all feilds are required"});
        }
        else{
            const owner_id=req.user.id;
            const query=`insert into stores(name,address,owner_id) values(?,?,?)`;
            db.query(query,[name,address,owner_id],(err,result)=>{
                if(err){
                    return res.status(500).json({message:err.message});
                }
                else{
                    return res.status(201).json({message:"store added"});
                }
            })
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
};


export function getstores(req,res){
    try{
        const query=`select * from stores`;
        db.query(query,(err,result)=>{
            if(err){
                return res.status(500).json({message:err.message});
            }
            else{
                if(result.length===0){
                    return res.status(404).json({message:"no stores to show"});
                }
                else{
                    return res.status(200).json({stores:result});
                }
            }
        })
    }catch(err){
        return res.status(500).json({message:err.message});
    }
};



//get store by name
export function searchStoreByName(req,res){
    try{
        const {name}=req.query;
        if(!name){
            return res.status(400).json({message:"bad request"});
        }
        else{
            const query=`select * from stores where name like ?`
            db.query(query,[`%${name}%`],(err,result)=>{
                if(err){
                    return res.status(500).json({message:err.message});
                }
                else{
                    if(result.length===0){
                        return res.status(404).json({message:"no store found by this name"});
                    }
                    else{
                        return res.status(201).json({message:"store found", store:result});
                    }
                }
            })
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
};


//get store details 
export function StoresDetailsById(req, res) {
    try {
        const {id}=req.params;
        const query = `select s.name as store_name,u.name as owner_name, 
                       u.email as owner_email, s.address as store_address, 
                       avg(r.rating) as avg_rating from  stores s inner join users u 
                       on u.id=s.owner_id left join ratings r on r.store_id=s.store_id
                       where s.store_id=? group by s.store_id`;

        db.query(query,[id],(err,result)=>{{
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