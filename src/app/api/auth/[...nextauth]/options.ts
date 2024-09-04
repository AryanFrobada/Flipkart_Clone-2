import { Account, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { getDataSource } from "../../../../../server/config/dataSource";
import { User } from "../../../../../server/models/User";
import { Profile } from "next-auth";

interface GoogleProfile extends Profile {
  email_verified?: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and Password are required");
          }

          const dataSource = getDataSource();
          const userRepository = dataSource.getRepository(User);

          const user = await userRepository.findOne({ where: { email: credentials.email.toString() } });

          if (!user) {
            console.log("No user found with this email");
            throw new Error("No user found with this email");
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password);

          if (!isValidPassword) {
            console.log("Invalid credentials");
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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: 'http://localhost:3000/api/auth/callback/google',
        }
      }
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,

  callbacks: {
    async signIn({ user, account, profile }: { user: any; account: any; profile?: GoogleProfile }) {
      if (account?.provider === "google") {
        return profile?.email_verified && profile.email?.endsWith("@gmail.com") || false;
      }
      return true; // Allow sign in for other providers
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id.toString();
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
