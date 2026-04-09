import jwt from "jsonwebtoken"

export const optionalUserAuthMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token) return next();

        const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

        const decoded = jwt.verify(cleanToken, process.env.USER_ACCESS_TOKEN_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        next();
    }
}