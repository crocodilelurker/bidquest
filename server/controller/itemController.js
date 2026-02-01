const response = require("../utils/responseHandler");
const z = require("zod");
const prisma = require("../lib/prisma");
const addItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, description, price, image, category } = req.body;
        if (!name || !description || !price || !image || !category) {
            return response(res, 400, "Bad Request Missing Fields", null)
        }
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

const getItemData = async (req, res) => {
    try {
        let itemId = req.params.id;
        itemId = Number(itemId)
        const item = await prisma.item.findUnique({
            where: {
                id: itemId
            }
        })
        if (!item) {
            return response(res, 404, "Item Not Found", null);
        }
        else {
            return response(res, 200, "Item Found", item);
        }
    } catch (error) {
        console.error("error in itemController", error);
        return response(res, 500, "Internal Server Error")
    }
}
const getAllItems = async (req, res) => {
    try {
        const items = await prisma.item.findMany()
        if (items.length === 0) {
            return response(res, 404, "Items Not Found", null)
        }
        else {
            return response(res, 200, "Items Found", items)
        }
    } catch (error) {
        console.error("error in itemController", error);
        return response(res, 500, "Internal Server Error")
    }
}

const getOwnedItems = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming middleware sets this
        // Check if user exists (middleware does auth, but let's be safe or just trust token)

        const items = await prisma.item.findMany({
            where: {
                userId: userId
            }
        });

        if (items.length === 0) {
            // 200 OK with empty array is better than 404 for "no items found for this user"
            // but user wants to display them, so let's just return the empty list
            return response(res, 200, "No Items Found", [])
        } else {
            return response(res, 200, "Owned Items Found", items)
        }

    } catch (error) {
        console.error("error in getOwnedItems", error);
        return response(res, 500, "Internal Server Error")
    }
}

module.exports = {
    addItem,
    getItemData,
    getAllItems,
    getOwnedItems
}