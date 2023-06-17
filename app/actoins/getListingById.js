import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getListingById = async ( listingId ) => {
    try {
        const listing = await prisma.listing.findUnique({ where: { id: listingId }, include: { user: true } });
        if (!listing) return null;
        return listing;
        // return {
        //     ...listing,
        //     createdAt: listing.createdAt.toISOString(),
        //     user: {
        //         ...listing.user,
        //         createdAt: listing.user.createdAt.toISOString(),
        //         updatedAt: listing.user.updatedAt.toISOString(),
        //         emailVerified: listing.user.emailVerified?.toISOString() || null,
        //     }
        // };
    } catch (error) {
        console.log(error);
    }
};

export default getListingById;
