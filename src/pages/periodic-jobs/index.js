import Link from "next/link";
import { getSession, useSession } from "next-auth/client";
import { useCallback, useEffect } from "react";
import { signIn } from "@dbcdk/login-nextjs/client";

export default function Delivered() {
  const [session] = useSession();

  const waitForSession = useCallback(async () => {
    let s = await getSession();
    if (!s) {
      signIn();
    }
  }, [session]);

  useEffect(() => {
    waitForSession();
  }, []);

  return (
    <>
      <h1>Delivered</h1>
    </>
  );
}
