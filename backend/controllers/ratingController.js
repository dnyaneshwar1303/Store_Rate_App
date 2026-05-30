import { db } from "../models/userModel.js";

// Submit / Update Rating
export function submitRating(req, res) {
    try {
        const { store_id } = req.params;
        const { rating } = req.body;
        const user_id = req.user.id;

        if (rating === undefined || rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
        }

        const checkQuery = `
            SELECT *
            FROM ratings
            WHERE store_id=? AND user_id=?
        `;

        db.query(checkQuery, [store_id, user_id], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.length > 0) {
                const updateQuery = `
                    UPDATE ratings
                    SET rating=?
                    WHERE store_id=? AND user_id=?
                `;

                db.query(
                    updateQuery,
                    [rating, store_id, user_id],
                    (err) => {
                        if (err) {
                            return res.status(500).json({
                                message: err.message
                            });
                        }

                        return res.status(200).json({
                            message: "Rating updated successfully"
                        });
                    }
                );
            } else {
                const insertQuery = `
                    INSERT INTO ratings(rating,user_id,store_id)
                    VALUES(?,?,?)
                `;

                db.query(
                    insertQuery,
                    [rating, user_id, store_id],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                message: err.message
                            });
                        }

                        return res.status(201).json({
                            message: "Rating submitted successfully",
                            ratingId: result.insertId
                        });
                    }
                );
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Store Owner Dashboard - Users who rated my store
export function getMyStoreRatings(req, res) {
    try {
        const ownerId = req.user.id;

        const query = `
            SELECT
                u.id,
                u.name,
                u.email,
                r.rating
            FROM stores s
            INNER JOIN ratings r
                ON s.store_id = r.store_id
            INNER JOIN users u
                ON u.id = r.user_id
            WHERE s.owner_id = ?
        `;

        db.query(query, [ownerId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json({
                ratings: result
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Store Owner Dashboard - Average Rating
export function getMyStoreAverageRating(req, res) {
    try {
        const ownerId = req.user.id;

        const query = `
            SELECT
                ROUND(AVG(r.rating),1) AS average_rating
            FROM stores s
            LEFT JOIN ratings r
                ON s.store_id = r.store_id
            WHERE s.owner_id = ?
        `;

        db.query(query, [ownerId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json({
                averageRating:
                    result[0]?.average_rating || 0
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}