import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import db from "@/lib/db";

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
                if(!credentials?.Username || !credentials?.Password) return null;
                const user = await db.users.findFirst({
                  where: {
                    Username: credentials?.Username,
                  },
                });
                if (user && user.Password) {
                  const passwordCorrect = await compare(credentials?.Password || "", user.Password);
                  if (passwordCorrect) {
                    return {
                      id: user.id.toString(), // Convert id to string
                      Username: user.Username,
                      Email: user.Email,
                    };
                  }
                }
                else {
                  await db.users.create({
                    data: {
                      Username: credentials?.Username || "",
                      Email: credentials?.Email || "",
                      Password: credentials?.Password || "",
                    },
                  });
                }
                return null;
              }
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID??"",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET??"",
        })
    ],
    callbacks: {
      async session({ token, session }) {
        if (token) {
          session.user = {
            name: token.name,
            email: token.email,
            image: token.image as string | null | undefined,
          };
        }
  
        return session
      },
  
      
      async jwt({ token, user }) {
        const dbUser = await db.users.findFirst({
          where: {
            Email: token.email || '',
          },
        })

        if (user && !dbUser) {
          token.id = user.id ? user.id.toString() : '' // Convert id to string
          return token
        }

        return dbUser ? {
          id: dbUser.id.toString(), // Convert id to string
          Username: dbUser.Username,
          Email: dbUser.Email,
          Image: dbUser.Image || null,
        } : token
      },
      
      redirect() {
        return '/'
      },
    },
});

export {handler as GET, handler as POST}