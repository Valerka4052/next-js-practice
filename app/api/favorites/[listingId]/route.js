import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import getCurrentUser from '@/app/actoins/getCurrentUser';
const prisma = new PrismaClient();

export async function POST(request,{params}) { 
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    const { listingId } = params;
    console.log('listingId', listingId)
    if (!listingId || typeof (listingId) !== 'string') throw new Error('invalid ID');
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);
    const user = await prisma.user.update({ where: { id: currentUser.id }, data: { favoriteIds:favoriteIds } })
    return NextResponse.json(user);
};
export async function DELETE(request, { params }) {
const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    const {listingId} = params;
    if (!listingId || typeof (listingId) !== 'string') throw new Error('invalid ID');
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    const filteredIds = favoriteIds.filter(id => id !== listingId);
    const user = await prisma.user.update({ where: { id: currentUser.id }, data: { favoriteIds:filteredIds } })
    return NextResponse.json(user);
}