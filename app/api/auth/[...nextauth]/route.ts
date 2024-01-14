import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                Username: {},
                Email: {},
                Password: {}
              },
              async authorize(credentials, req) {
                const user = await prisma.users.findFirst({
                  where: {
                    Username: credentials?.Username,
                  },
                });
                if (user && user.Password) {
                  const passwordCorrect = await compare(credentials?.Password || "", user.Password);
                  if (passwordCorrect) {
                    return {
                      id: user.id.toString(), // Convert id to string
                      username: user.Username,
                      email: user.Email,
                    };
                  }
                }

                return null;
              }
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID??"",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET??"",
        })
    ],
});

export {handler as GET, handler as POST}