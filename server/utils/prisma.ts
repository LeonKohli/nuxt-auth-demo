import { PrismaClient } from '@prisma/client'

// Create a single instance of Prisma Client
const prisma = new PrismaClient()

// Export the prisma instance
export default prisma