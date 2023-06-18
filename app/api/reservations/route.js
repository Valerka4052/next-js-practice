import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import getCurrentUser from '@/app/actoins/getCurrentUser';
const prisma = new PrismaClient();

export async function POST(request) { 
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    const body = await request.json();
    const { listingId, startDate, endDate, totalPrice } = body;
    if (!listingId || !startDate || !endDate || !totalPrice) return NextResponse.error();
    const listingAndReservation = await prisma.listing.update({ where: { id: listingId }, data: { reservations: { create: { userId: currentUser.id, startDate, endDate, totalPrice } } } });
    return NextResponse.json(listingAndReservation);
};