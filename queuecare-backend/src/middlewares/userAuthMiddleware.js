import jwt from "jsonwebtoken";
import { use } from "react";

export const userAuthMiddleware = (req, res, next) => {
    try {
        const user_jwt_token = localStorage.getItem("user_jwt_token");

        if(!user_jwt_token) {
            return res.status(401).json({
                message: "No token provided",
            });
        }

        // handle bearer token
        if(user_jwt_token.startsWith("Bearer ")) {
            user_jwt_token = user_jwt_token.split(" ")[1];

            const decoded = jwt.verify(user_jwt_token, process.env.USER_ACCESS_TOKEN_SECRET);

            //attach userId to request
            req.userId = decoded.userId;

            next();
        }
    } catch (error) {
        return res.status(401),json({
            message: "Invalid or expired token",
        })
    }
}