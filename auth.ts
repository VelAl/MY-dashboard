import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { credentialsSchema } from "@/app/lib/shemas";
import { getUser } from "@/app/lib/data";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCreds = credentialsSchema.safeParse(credentials);
        if (!parsedCreds.success) return null;

        const { email, password } = parsedCreds.data;
        const user = await getUser(email);
        if (!user) return null;

        const isPsswordsMatch = await bcryptjs.compare(password, user.password);

        if (isPsswordsMatch) return user;

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
