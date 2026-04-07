import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const jwt_token = req.headers.authorization;
    
    // Check if token exists
    if (!jwt_token) {
      console.log("No authorization header");
      return res.status(401).json({ 
        message: "No token provided",
        success: false 
      });
    }
    
    // Extract token (handle both "Bearer token" and just "token")
    let token = jwt_token;
    if (jwt_token.startsWith("Bearer ")) {
      token = jwt_token.split(" ")[1];
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.CLINIC_ACCESS_TOKEN_SECRET);
    
    // Attach clinic ID to request
    req.clinicId = decoded.clinicId;
    
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ 
      message: "Invalid or expired token",
      success: false,
      error: error.message 
    });
  }
};