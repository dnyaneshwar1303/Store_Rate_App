import { db } from "../models/userModel.js";


export function createStore(req,res){
    try{
        const {name,email,address,owner_id}=req.body;

        if(!name || !email || !address || !owner_id){
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        const query=`
        INSERT INTO stores(name,email,address,owner_id)
        VALUES(?,?,?,?)
        `;

        db.query(
            query,
            [name,email,address,owner_id],
            (err,result)=>{
                if(err){
                    return res.status(500).json({
                        message:err.message
                    });
                }

                return res.status(201).json({
                    message:"Store created successfully",
                    storeId:result.insertId
                });
            }
        );
    }catch(err){
        return res.status(500).json({
            message:err.message
        });
    }
}


export function getstores(req,res){
    try{
        const query=`
        SELECT
            s.store_id,
            s.name,
            s.email,
            s.address,
            ROUND(AVG(r.rating),1) AS avg_rating
        FROM stores s
        LEFT JOIN ratings r
        ON s.store_id=r.store_id
        GROUP BY s.store_id
        `;

        db.query(query,(err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }

            return res.status(200).json({
                stores:result
            });
        });
    }catch(err){
        return res.status(500).json({
            message:err.message
        });
    }
}



//get store by name
export function searchStore(req,res){
    try{
        const {search}=req.query;

        if(!search){
            return res.status(400).json({
                message:"Search value required"
            });
        }

        const query=`
        SELECT *
        FROM stores
        WHERE name LIKE ?
        OR address LIKE ?
        `;

        db.query(
            query,
            [`%${search}%`,`%${search}%`],
            (err,result)=>{
                if(err){
                    return res.status(500).json({
                        message:err.message
                    });
                }

                return res.status(200).json({
                    stores:result
                });
            }
        );
    }catch(err){
        return res.status(500).json({
            message:err.message
        });
    }
}


