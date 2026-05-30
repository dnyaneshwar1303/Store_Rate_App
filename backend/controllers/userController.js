import { db } from "../models/userModel.js";
import bcrypt from "bcrypt";

// Update Password
export async function updatePassword(req, res) {
    try {
        const { password } = req.body;
        const id = req.user.id;

        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            });
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be 8-16 characters and contain at least one uppercase letter and one special character"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const query =
            "UPDATE users SET password=? WHERE id=?";

        db.query(
            query,
            [hashedPassword, id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }

                return res.status(200).json({
                    message:
                        "Password updated successfully"
                });
            }
        );
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}