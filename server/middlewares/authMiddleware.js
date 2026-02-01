const response = require("../utils/responseHandler");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

dotenv.config();



const authMiddleware = async (req, res, next) => {
    const token = req.cookies.x_auth_token;
    if (!token) {
        return response(res, 401, "Unauthorized")
    }
    try {
        const decode = jwt.decode(token, process.env.JWT_SECRET_KEY)
        req.user = decode
        next();
    } catch (error) {
        console.error("Error in AuthMiddleware", error)
        return response(res, 500, "Internal Server Error")
    }
}

module.exports = authMiddleware;