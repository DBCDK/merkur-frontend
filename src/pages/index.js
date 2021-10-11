import React, {useCallback, useEffect} from "react";
import { getSession, useSession } from "next-auth/client";
import { signIn } from "@dbcdk/login-nextjs/client";
import { useRouter } from "next/router";

export default function Index() {
  const [session] = useSession();
  const router = useRouter();

  const waitForSession = useCallback(async () => {
    let s = await getSession();
    if (!s) {
      signIn();
    } else {
      router.push("/konverteringer");
    }
  }, [session]);

  useEffect(() => {
    waitForSession();
  }, []);

  return <div />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  return {
    props: { session },
  };
}
