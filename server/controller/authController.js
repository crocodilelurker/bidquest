const response = require("../utils/responseHandler.js")
const z = require("zod");
const bcrypt = require("bcrypt")
const prisma = require("../lib/prisma.js");
const generateWebToken = require("../utils/generateToken.js");

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return response(res, 400, " Bad Request ALL fields are required")
        }
        const userSchema = z.object({
            name: z.string().min(3, "Name must be at least 3 characters long"),
            email: z.email("Invalid email address"),
            password: z.string().min(6, "Password must be at least 6 characters long")
        })
        const { success } = userSchema.safeParse({ name, email, password })
        if (!success) {
            return response(res, 400, "Invalid Fields or Unfilled Fields")
        }
        const user = await prisma.user.findUnique({ where: { email } })
        if (user) {
            return response(res, 400, "User already Exists");
        }
        else {
            const saltRound = 10;
            const hashedPassowrd = await bcrypt.hash(password, saltRound);
            const createdUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassowrd
                }
            })
            //create token for the user validity 
            const token = generateWebToken(createdUser.id);
            res.cookie("x_auth_token", token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            const { password: _, ...userWithoutPassword } = createdUser;
            return response(res, 201, "User Created Successfully", { createdUser: userWithoutPassword, token });
        }
    } catch (error) {
        console.error("Internal Server Error", error);
        return response(res, 500, "Internal Server Error")
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return response(res, 400, "Invalid Fields or Unfilled Fields")
        }
        const loginSchema = z.object({
            email: z.email("Invalid email address"),
            password: z.string().min(6, "Password must be at least 6 characters long")
        })
        const { success } = loginSchema.safeParse({ email, password })
        if (!success) {
            return response(res, 400, "Invalid Fields or Unfilled Fields")
        }
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return response(res, 404, "User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return response(res, 401, "Invalid Password");
        }
        const token = generateWebToken(user.id);
        res.cookie("x_auth_token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })

        const { password: _, ...userWithoutPassword } = user;
        return response(res, 200, "User Logged in Successfully", { user: userWithoutPassword, token });
    } catch (error) {
        console.error("Internal Server Error", error);
        return response(res, 500, "Internal Server Error")
    }
}
const logout = async (req, res) => {
    try {
        res.cookie("x_auth_token", "", { expires: new Date(0) })
        return response(res, 200, "Logout Successfull")
    } catch (error) {
        console.error("Internal Server Error", error);
        return response(res, 500, "Internal Server Error")
    }
}

module.exports = {
    createUser,
    loginUser,
    logout
}




