const response = require("../utils/responseHandler");
const z = require("zod");
const prisma = require("../lib/prisma");
const addItem = async (req, res) => {
    try {
        //get userId from x-auth-token decoder
        const userId = req.user.userId;
        const { name, description, price, image, category } = req.body;
        if (!name || !description || !price || !image || !category) {
            return response(res, 400, "Bad Request Missing Fields", null)
        }
        //verify type using zod
        const itemSchema = z.object({
            name: z.string(),
            description: z.string(),
            price: z.number(),
            image: z.string(),
            category: z.enum(["ELECTRONICS", "FASHION", "HOME_AND_LIVING", "SPORTS_AND_OUTDOORS", "BEAUTY_AND_PERSONAL_CARE", "TOYS_AND_GAMES", "OTHER"]),
        })
        const result = itemSchema.safeParse(req.body);
        if (!result.success) {
            const error = result.error.errors[0].message;
            console.log(error);
            return response(res, 400, "Bad Request Invalid Fields", error)
        }
        if (!category) {
            category = "ELECTRONICS";
        }
        const createItem = {
            name: name,
            description: description,
            price: price,
            image: image,
            category: category,
            userId: userId
        };
        const item = await prisma.item.create({
            data: createItem
        })
        if (item) {
            return response(res, 200, "Item Added Successfully", item)
        }
    } catch (error) {
        console.error("error in itemController", error);
        return response(res, 500, "Internal Server Error")
    }
}

module.exports = {
    addItem
}