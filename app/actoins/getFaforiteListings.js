import { PrismaClient } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";
const prisma = new PrismaClient();


const getFaforiteListings = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return [];
        const favorites = await prisma.listing.findMany({ where: { id: { in: [...(currentUser.favoriteIds || [])] } } });
        return favorites;
    } catch (error) {
       throw new Error(error)
    };
};

export default getFaforiteListings
