import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export default NextAuth({
    providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async session({ session, token, user }) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.picture = token.picture;
        session.user.email = token.email;
        return session;

      },
    },
  });