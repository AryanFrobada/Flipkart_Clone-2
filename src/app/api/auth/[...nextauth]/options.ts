import { Account, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { getDataSource } from "../../../../../server/config/dataSource";
import { User } from "../../../../../server/models/User";
import { Profile } from "next-auth";
import dotenv from "dotenv"
import { saveGoogleUser } from "../../../../services/operations/authAPI";

dotenv.config();

interface GoogleProfile extends Profile {
  email_verified?: boolean;
}

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: "jwt",
    maxAge: 5*60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,

  callbacks: {
    async signIn({ user, account, profile }: { user: any; account: any; profile?: GoogleProfile }) {
      console.log("Sign-in attempt:", { user, account, profile });
      if (account?.provider === "google") {
        const googleProfile = profile as { given_name: string; family_name: string }; // Cast profile
        const firstName = googleProfile.given_name;
        const lastName = googleProfile.family_name;

        console.log("Printing UserID: ", user.id);
        console.log("Printing User Email: ", user.email);
        console.log("Printing Firstname: ", firstName);
        console.log("Printing LastName: ", lastName);
         // Send the Google user data to the backend
        await saveGoogleUser(user.id!.toString(), user.email!, firstName, lastName);
        console.log("Signup Successful !!");
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
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
};
