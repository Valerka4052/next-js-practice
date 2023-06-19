import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import getCurrentUser from '@/app/actoins/getCurrentUser';
const prisma = new PrismaClient();

export async function DELETE(request,{params}) { 
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    const { id } = params;
    if (!id || typeof id !== 'string') throw new Error('Invalid Id');
    const reservation = await prisma.reservation.deleteMany({ where: { id, OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }] } });
    return NextResponse.json(reservation);
};