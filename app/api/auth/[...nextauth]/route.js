import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { PrismaAdapter } from "@auth/prisma-adapter";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: { email: { label: 'email', type: 'text' }, password: { label: 'password', type: 'password' }, },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) throw new Error('invalid credentials');
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user || !user?.hashedPassword) throw new Error('invalid credentials');
                const correctPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!correctPassword) throw new Error('invalid credentials');
                return user;
            }
        }),
    ],
    pages: { signIn: '/', }, debug: process.env.NODE_ENV === 'development', session: { strategy: 'jwt' }, secret: process.env.NEXTAUTH_SECRET
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
