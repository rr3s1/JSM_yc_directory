import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // Check if user exists in Sanity on sign-in; create if not
    async signIn({
                   user: { name, email, image },
                   profile: { id, login, bio },
                 }) {
      // Check for existing user, bypassing cache for accuracy
      const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id,
          });

      // If user doesn't exist, create a new author document
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    // Add the Sanity _id to the JWT token
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Fetch user again to get the Sanity _id
        const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
              id: profile?.id,
            });

        // Store Sanity _id in the token
        token.id = user?._id;
      }

      return token;
    },
    // Expose the Sanity _id in the session object
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});