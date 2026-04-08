import jwt from "jsonwebtoken";

export const userAuthMiddleware = (req, res, next) => {
    try {
        const user_jwt_token = req.headers.authorization;

        if(!user_jwt_token) {
            return res.status(401).json({
                message: "No token provided",
                success: false,
            });
        }

        // handle bearer token
        let token = user_jwt_token;
        if(user_jwt_token.startsWith("Bearer ")) {
            token = user_jwt_token.split(" ")[1];

            const decoded = jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET);

            //attach userId to request
            req.userId = decoded.userId;

            next();
        }
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        })
    }
}