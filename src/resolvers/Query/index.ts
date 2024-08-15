import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Query = {
  users: async (parent: any, args: any, context: any) => {
    return await prisma.user.findMany();
  },
};

export default Query
