import NextAuth from "next-auth";
import { adgangsplatformen, callbacks } from "@dbcdk/login-nextjs";

const options = {
  providers: [
    adgangsplatformen({
      clientId: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      profile(user) {
        return user;
      },
    }),
  ],
  callbacks: {
    ...callbacks,
  },
};

export default (req, res) => NextAuth(req, res, options);
