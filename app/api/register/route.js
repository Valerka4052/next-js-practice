import bcrypt from 'bcrypt';
// import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export async function POST(request) {
    const body = await request.json();
    const { email, name, password } = body;
    const hashedPassword = await bcrypt.hash(password, 7);
    const user = await prisma.user.create({ data: { email, name, hashedPassword } });
    return NextResponse.json(user);
};