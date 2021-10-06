import React, { useEffect } from "react";
import { getSession, useSession } from "next-auth/client";
import { signIn } from "@dbcdk/login-nextjs/client";
import { useRouter } from "next/router";

export default function Index() {
  const [session] = useSession();
  const router = useRouter();

  useEffect(async () => {
    if (!session) {
      signIn();
    } else {
      router.push("/conversions");
    }
  }, []);

  return <div />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  return {
    props: { session },
  };
}
