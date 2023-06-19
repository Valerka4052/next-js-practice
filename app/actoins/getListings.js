import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getListings = async (params) => {
    try {
        const { userId } = params;
        let query = {};
        if (userId) query.userId = userId;
        const listings = await prisma.listing.findMany({where:query, orderBy: { createdAt: 'desc' } });
        return listings;
    } catch (error) {
        throw new Error(error);
    };
};

export default getListings
