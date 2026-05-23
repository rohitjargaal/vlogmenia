import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

export const isLogin = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" , success: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found", success: false });
        }
        req.user = user;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("JWT verification error:", error)
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};