export const postResolvers = {
  post: async (parent: any, post: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }
    if (!post.title || !post.content) {
      return {
        userError: "Title and content is required",
        post: null,
      };
    }
    const newpost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo,
      },
    });
    return {
      userError: "Post created Success !",
      post: newpost,
    };
  },

  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userInfo,
      },
    });
    if (!user) {
      return {
        userError: "user not found",
        post: null,
      };
    }
    const Upost = await prisma.post.findUnique({
      where: {
        id: Number(args.postId),
      },
    });
    if (!Upost) {
      return {
        userError: "post not found",
        post: null,
      };
    }
    if (Upost.authorId !== user.id) {
      return {
        userError: "post not owned by user",
        post: null,
      };
    }
    const updatePost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        // args.post,
        published: true,
      },
    });
    return {
      userError: null,
      post: updatePost,
    };
  },

  deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userInfo,
      },
    });
    if (!user) {
      return {
        userError: "user not found",
        post: null,
      };
    }
    const Upost = await prisma.post.findUnique({
      where: {
        id: Number(args.postId),
      },
    });
    if (!Upost) {
      return {
        userError: "post not found",
        post: null,
      };
    }
    if (Upost.authorId !== user.id) {
      return {
        userError: "post not owned by user",
        post: null,
      };
    }
    const deletePost = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      },
    });
    return {
      userError: null,
      post: deletePost,
    };
  },

  publishPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userInfo,
      },
    });
    if (!user) {
      return {
        userError: "user not found",
        post: null,
      };
    }
    const Upost = await prisma.post.findUnique({
      where: {
        id: Number(args.postId),
      },
    });
    if (!Upost) {
      return {
        userError: "post not found",
        post: null,
      };
    }
    if (Upost.authorId !== user.id) {
      return {
        userError: "post not owned by user",
        post: null,
      };
    }
    const publishedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        published: true,
      },
    });
    return {
      userError: null,
      post: publishedPost,
    };
  },
};
