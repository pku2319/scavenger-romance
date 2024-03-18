import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

import { createTraveler } from "./app/lib/actions";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await createTraveler({ name: user.name, email: user.email, game: process.env.GAME })
      return true
    },
  },
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })],
})