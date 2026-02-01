const prisma = require("../lib/prisma");
const response = require("../utils/responseHandler");

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return response(res, 401, "Invalid Token Data");
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        if (!user) {
            return response(res, 404, "User not found");
        }
        return response(res, 200, "User Profile Found", user);
    } catch (error) {
        console.error("Error in getUserProfile", error);
        return response(res, 500, "Internal Server Error");
    }
}

module.exports = {
    getUserProfile
}
