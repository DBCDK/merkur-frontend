import NextAuth from "next-auth";
import { adgangsplatformen, callbacks } from "@dbcdk/login-nextjs";

export const options = {
  providers: [
    {
      ...adgangsplatformen({
        clientId: `${process.env.CLIENT_ID}`,
        clientSecret: `${process.env.CLIENT_SECRET}`,
      }),
      profile(user) {
        if (!user || !user.attributes || !user.attributes.netpunktAgency) {
          return false;
        }
        return { id: user.attributes.netpunktAgency };
      },
    },
  ],
  callbacks: {
    ...callbacks,
  },
};

export default (req, res) => NextAuth(req, res, options);
