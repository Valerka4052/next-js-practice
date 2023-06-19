import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import getCurrentUser from '@/app/actoins/getCurrentUser';
const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    const { listingId } = params;
    if (!listingId || typeof listingId !== 'string') throw new Error('Invalid ID');
    const listing = await prisma.listing.deleteMany({ where: { id: listingId, userId: currentUser.id } });
    return NextResponse.json(listing);
};