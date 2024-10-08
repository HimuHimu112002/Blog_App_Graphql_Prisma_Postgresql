import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { Prisma, PrismaClient } from "@prisma/client";
import { getUserVerify } from "./utils/jwtTokenHelper";
import { DefaultArgs } from "@prisma/client/runtime/library";
export const prisma = new PrismaClient();

interface Context{
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  userInfo: {
    userId: number | null
  } | null
}
const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({req}): Promise<Context>=>{
      const userInfo = await getUserVerify(req.headers.authorization as string)
      return{
        prisma,
        //@ts-ignore
        userInfo
      }
    }
  });
  console.log(`🚀  Server ready at: ${url}`);
};
main();
