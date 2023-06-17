import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getListings = async () => {
    try {
        const listings = await prisma.listing.findMany({ orderBy: { createdAt: 'desc' } });
        return listings;
    } catch (error) {
        throw new Error(error);
    };
};

export default getListings
