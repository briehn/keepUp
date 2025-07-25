import NextAuth, { SessionStrategy } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Account } from "@prisma/client/wasm";

const prisma = new PrismaClient();

export const authOptions = {
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userWithAccount = await prisma.user.findUnique({
          where: { email: credentials?.email },
          include: { accounts: true },
        });

        if (
          userWithAccount &&
          userWithAccount.accounts.length > 0
        ) {
          const account = userWithAccount.accounts.find(
            (acc: Account) => acc.provider === "credentials"
          );

          if (!account?.password) {
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials!.password!,
            account.password
          );

          if (isValid) {
            return userWithAccount;
          }
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" as SessionStrategy},
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
