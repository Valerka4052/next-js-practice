import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getListings = async (params) => {
    try {
        const { userId, roomCount, guestCount, bathroomCount, locationValue, startDate, endDate, category } = params;
        let query = {};
        if (userId) query.userId = userId;
        if (category) query.category = category;
        if (roomCount) query.roomCount = { gte: +roomCount };
        if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
        if (guestCount) query.guestCount = { gte: +guestCount };
        if (locationValue) query.locationValue = locationValue;
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: { OR: [{ endDate: { gte: startDate }, startDate: { lte: startDate } }, { startDate: { lte: endDate }, endDate: { gte: endDate } }] }
                }
            };
        };
        const listings = await prisma.listing.findMany({ where: query, orderBy: { createdAt: 'desc' } });
        return listings;
    } catch (error) {
        throw new Error(error);
    };
};

export default getListings
