// app/api/auth/[...nextauth]/options.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { getDataSource } from "@/dbConfig/dataSource";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials?.email || !credentials.password) {
            throw new Error("Email and Password are required");
          }

          const dataSource = getDataSource();
          const userRepository = dataSource.getRepository(User);

          // Find the user by email
          const user = await userRepository.findOne({ where: { email: credentials.email } });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password);

          if (!isValidPassword) {
            throw new Error("Invalid credentials");
          }

          return user;

        } catch (error) {
          console.error("Error in authorize function:", error);
          throw new Error("Authorization failed, please check your credentials.");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/auth/error', // Uncomment if you have an error page
    verifyRequest: '/auth/verify-request', // Uncomment if you have an email verification page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email;
      }
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   // Redirect users to the homepage after sign-in
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
  },
};
