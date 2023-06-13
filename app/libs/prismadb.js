// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient()

// const client = globalThis.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

// export default prisma

import { PrismaClient } from "@prisma/client"

// declare global {
//   var prisma: PrismaClient | undefined
// }

const prisma = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma

export default prisma