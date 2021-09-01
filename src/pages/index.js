import React, { useCallback, useEffect } from "react";
import { getSession, useSession } from "next-auth/client";
import { signIn } from "@dbcdk/login-nextjs/client";

export default function Index() {
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

  if (session) {
    return (
      <div className="align-center">
        <h1 data-cy="welcome-text">Velkommen til Merkur</h1>
      </div>
    );
  } else {
    return (
      <div className="align-center">
        <h1 data-cy="welcome-text">Du har ikke adgang til Merkur</h1>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
