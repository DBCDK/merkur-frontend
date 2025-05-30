import React, { useCallback, useEffect } from "react";
import { getSession } from "next-auth/react";
import { signIn } from "@dbcdk/login-nextjs/client";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/[...nextauth]";

export default function Index({ session }) {
  const router = useRouter();

  const waitForSession = useCallback(async () => {
    let s = await getSession();
    if (!s) {
      signIn();
    } else {
      router.push("/converted");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, router]);

  useEffect(() => {
    waitForSession();
  }, [waitForSession]);

  return <div></div>;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, options);

  return {
    props: { session },
  };
}
