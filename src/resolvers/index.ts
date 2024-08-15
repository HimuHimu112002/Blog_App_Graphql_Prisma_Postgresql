import { PrismaClient } from "@prisma/client";
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import { jwtToken } from "../utils/jwtTokenHelper";
import config from "../config";

const prisma = new PrismaClient();
interface userInfo {
  name: string,
  email: string,
  password: string,
  bio: string
}
export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: userInfo, context: any) => {
      const isExist = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (isExist) {
        return {
          userError: "This email already in exist!",
          token: null,
        };
      }
      const hashPassword = await bcrypt.hash(args.password, 12);
      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashPassword,
        },
      });
      if(args.bio){
        await prisma.profile.create({
          data:{
            bio: args.bio,
            userId: newUser.id
          }
        })
      }
      const token = await jwtToken({ userId: newUser.id },config.jwt.secret as string);
      return {
        userError: "User Registration Success !",
        token,
      };
    },

    signIn: async (parent: any, args: userInfo, context: any) => {
      const userlogin = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (!userlogin) {
        return {
          userError: "User Not Found",
          token: null,
        };
      }

      const correctPass = await bcrypt.compare(
        args.password,
        userlogin?.password
      );
      if (!correctPass) {
        return {
          userError: "Incorrect Password",
          token: null,
        };
      }
      const token = await jwtToken({ userId: userlogin.id },config.jwt.secret as string);
      return {
        userError: "Login Successfull",
        token,
      };
    },
  },
};
