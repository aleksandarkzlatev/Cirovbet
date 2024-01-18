import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import db from "@/lib/db";
import getServerSession  from "next-auth";

export const authOptions : NextAuthOptions = ({
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
                console.log(user && user.Password);
                if (user !== null && user.Password) {
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
                  try {
                    console.log(credentials);
                    const user = await db.users.create({
                      data: {
                        Username: String(credentials?.Username || ""),
                        Email: String(credentials?.Email || ""),
                        Password: String(credentials?.Password || ""),
                      },
                    });
                    return user;
                  } catch (error) {
                    console.error(error);
                  }
                }
                return user;
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
          token.name = user.name || '' // Add this line
          return token
        }
      
        return dbUser ? {
          id: dbUser.id.toString(), // Convert id to string
          Username: dbUser.Username,
          Email: dbUser.Email,
          Image: dbUser.Image || null,
          name: dbUser.Username, // Add this line
        } : token
      },
      
      redirect() {
        return '/'
      },
    },
});

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}

export const getAuthSession = () => getServerSession(authOptions);