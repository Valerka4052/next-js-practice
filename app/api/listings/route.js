import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import getCurrentUser from '@/app/actoins/getCurrentUser';
const prisma = new PrismaClient();

export async function POST(request) { 
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    
    const body = await request.json();
    console.log('body', body)
    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body;
    Object.keys(body).forEach((value) => { if (!body[value]) NextResponse.error() });
    const listing = await prisma.listing.create({ data: { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue: location.value, price: parseInt(price, 10), userId: currentUser.id } });
    return NextResponse.json(listing);
};