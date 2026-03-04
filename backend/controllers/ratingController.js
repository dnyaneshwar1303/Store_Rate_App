import { db } from "../models/userModel.js";



// submit rating
export function submitRating(req, res) {
    try {
        const { store_id } = req.params;
        const { rating } = req.body;
        const user_id = req.user.id;

        if (rating===undefined || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
        else {
            const ratingquery = `select * from ratings where store_id=? and user_id=?`;
            db.query(ratingquery, [store_id, user_id], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    if (result.length > 0) {
                        const updateRatingQuery = `update ratings set rating=? where store_id=? and user_id=?`;
                        db.query(updateRatingQuery, [rating, store_id, user_id], (err, result) => {
                            if (err) {
                                return res.status(500).json({ message: err.message });
                            }
                            else {
                                return res.status(200).json({ Message: "rating Updated" });
                            }
                        })
                    }
                    else {
                        const submitratingQuery = `insert into ratings(rating,user_id,store_id) values(?,?,?)`;
                        db.query(submitratingQuery, [rating, user_id, store_id], (err, result) => {
                            if (err) {
                                return res.status(500).json({ message: err.message });
                            }
                            else {
                                return res.status(201).json({ message: "rating submitted", submitted_rating: result });
                            }
                        })
                    }
                }
            })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};




export function getRatingByStore(req,res){
    try{
        const {id}=req.params;
        const query=`select u.name, r.rating as ratings from ratings r 
                     inner join users u on u.id=r.user_id where r.store_id=?`;

        db.query(query,[id,id],(err,result)=>{
            if(err){
                return res.status(500).json({message:err.message});
            }
            else{
                if(result.length===0){
                    return res.status(404).json({message:"no ratings to show"});
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