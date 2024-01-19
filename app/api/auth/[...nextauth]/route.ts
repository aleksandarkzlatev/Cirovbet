
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import db from "@/lib/db";
import getServerSession  from "next-auth";
import Providers from 'next-auth';
import { JWT } from "next-auth/jwt";
import {User, Account, Profile } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        Username: {},
        Email: {},
        Password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.Username || !credentials?.Password) return null;
        const user = await db.users.findFirst({
          where: {
            Username: credentials?.Username,
          },
        });
        
        if (user !== null && user.Password !== null) {
          const passwordCorrect = credentials.Password === user.Password;
          if (passwordCorrect) {
            return {
              id: user.id.toString(), // Convert id to string
              Username: user.Username,
              Email: user.Email,
            };
          }
        } else {
          try {
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
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params: { user: any; account: any; credentials?: Record<string, any> }) {
      const { user, account, credentials } = params;

      if (account.provider === 'google') {
        const { name, email, image } = user;

        let userExists = await db.users.findUnique({ where: { Email: email } });

        if (!userExists) {
          userExists = await db.users.create({
            data: {
              Username: name,
              Email: email,
              Image: image,
              Password: ""
            },
          });
        }

        return true;
      } else if (account.provider === 'credentials') {
        const { Username, Password } = credentials || {};

        let userExists = await db.users.findUnique({ where: { Username } });

        if (!userExists || userExists.Password !== Password) {
          return false;
        }

        return true;
      }

      return false;
    },
    async jwt(params: { token: any; user: any, account: any}) {
      const { token, user, account } = params;
      if (user) {
        if(account?.provider === 'google') {
          token.id = user.id;
          token.Username = user.name;
          token.Email = user.email;
          token.Image = user.image;
          token.provider = account.provider;
        }
        else{
          token.id = user.id;
          token.Username = user.Username;
          token.Email = user.Email;
          token.Image = user.Image;
        }
        token.items = user.items;
        token.Balance = user.Balance;
      }
      return token;
    },
    async session(params: { session: any; token: any}) {
      const { session, token } = params;
      if (token) {
        if(token.provider === 'google') {
          session.user.id = token.id;
          session.user.Username = token.name;
          session.user.Email = token.email;
          session.user.Image = token.image;
          session.user.provider = token.provider;
        }
        else{
          session.user.id = token.id;
          session.user.Username = token.Username;
          session.user.Email = token.Email;
          session.user.Image = token.Image;
        }
        session.user.items = token.items;
        session.user.Balance = token.Balance;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}

export const getAuthSession = () => getServerSession(authOptions);