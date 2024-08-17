export const User = {
  posts: async (parent: any, args: any, { prisma, userInfo }: any) => {
    const isMyProfile = parent.id === userInfo;
    if (isMyProfile) {
      return await prisma.post.findMany({
        where: {
          id: parent.authorId,
        },
      });
    }else{
        return await prisma.post.findMany({
            where: {
              id: parent.authorId,
              published: true
            },
          });
    }
  },
};
