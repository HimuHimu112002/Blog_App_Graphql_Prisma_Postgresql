import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Query = {
  me: async (parent: any, args: any, {prisma, userInfo}: any) => {
    return await prisma.user.findUnique({
      where:{
        id: userInfo
      }
    });
  },

  users: async (parent: any, args: any, context: any) => {
    return await prisma.user.findMany();
  },

  profile: async (parent: any, args: any, {prisma, userInfo}: any) => {
    return await prisma.profile.findUnique({
      where:{
        userId: Number(args.userId)
      }
    });
  },

  posts: async (parent: any, args: any, context: any) => {
    return await prisma.post.findMany({
      where:{
        published: false
        // akahen true dile jei post guli published true seguli asbe r false dile false guli asbe
      },
      orderBy:{
        createdAt: 'asc'
      }
    });
  },
};

export default Query
