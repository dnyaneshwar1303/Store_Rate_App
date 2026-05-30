import { db } from "../models/userModel.js";
import bcrypt from "bcrypt";

// Dashboard Stats
export function dashboardstats(req, res) {
    try {
        const query = `
            SELECT
                (SELECT COUNT(*) FROM users) AS total_users,
                (SELECT COUNT(*) FROM stores) AS total_stores,
                (SELECT COUNT(*) FROM ratings) AS total_ratings
        `;

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json({
                data: result[0]
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Create User (ADMIN / USER / STORE_OWNER)
export async function createUser(req, res) {
    try {
        const { name, email, password, address, role } = req.body;

        if (!name || !email || !password || !address || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (
            role !== "ADMIN" &&
            role !== "USER" &&
            role !== "STORE_OWNER"
        ) {
            return res.status(400).json({
                message: "Invalid role"
            });
        }

        if (name.length < 20 || name.length > 60) {
            return res.status(400).json({
                message: "Name must be between 20 and 60 characters"
            });
        }

        if (address.length > 400) {
            return res.status(400).json({
                message: "Address cannot exceed 400 characters"
            });
        }

        const checkQuery =
            "SELECT id FROM users WHERE email=?";

        db.query(checkQuery, [email], async (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.length > 0) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertQuery = `
                INSERT INTO users
                (name,email,password,address,role)
                VALUES (?,?,?,?,?)
            `;

            db.query(
                insertQuery,
                [
                    name,
                    email,
                    hashedPassword,
                    address,
                    role
                ],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: err.message
                        });
                    }

                    return res.status(201).json({
                        message: "User created successfully",
                        userId: result.insertId
                    });
                }
            );
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Get All Users
export function getUsers(req, res) {
    try {
        const query = `
            SELECT
                id,
                name,
                email,
                address,
                role
            FROM users
            ORDER BY id DESC
        `;

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json({
                users: result
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Get All Stores
export function StoresDetails(req, res) {
    try {
        const query = `
            SELECT
                s.store_id,
                s.name AS store_name,
                s.email AS store_email,
                s.address,
                ROUND(AVG(r.rating),1) AS avg_rating
            FROM stores s
            LEFT JOIN ratings r
            ON s.store_id = r.store_id
            GROUP BY s.store_id
            ORDER BY s.store_id DESC
        `;

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json({
                stores: result
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Get Single User Details
export function getUserDetails(req, res) {
    try {
        const { id } = req.params;

        const query = `
            SELECT
                id,
                name,
                email,
                address,
                role
            FROM users
            WHERE id=?
        `;

        db.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            return res.status(200).json({
                user: result[0]
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}


export function filterUsers(req, res) {
    try {
        const { name, email, role } = req.query;

        let query = `
            SELECT
                id,
                name,
                email,
                role
            FROM users
            WHERE 1=1
        `;

        const values = [];

        if (name) {
            query += " AND name LIKE ?";
            values.push(`%${name}%`);
        }

        if (email) {
            query += " AND email LIKE ?";
            values.push(`%${email}%`);
        }

        if (role) {
            query += " AND role = ?";
            values.push(role);
        }

        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json({
                users: result
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}


export function filterStores(req, res) {
    try {
        const { name, address } = req.query;

        let query = `
            SELECT
                s.store_id,
                s.name,
                s.address,
                ROUND(AVG(r.rating),1) AS avg_rating
            FROM stores s
            LEFT JOIN ratings r
            ON s.store_id = r.store_id
            WHERE 1=1
        `;

        const values = [];

        if (name) {
            query += " AND s.name LIKE ?";
            values.push(`%${name}%`);
        }

        if (address) {
            query += " AND s.address LIKE ?";
            values.push(`%${address}%`);
        }

        query += " GROUP BY s.store_id";

        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json({
                stores: result
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}