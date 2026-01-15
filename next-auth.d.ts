import NextAuth from "next-auth";

// Extend NextAuth types to include the custom 'id' property
declare module "next-auth" {
    interface Session {
        id: string;
    }

    interface JWT {
        id: string;
    }
}