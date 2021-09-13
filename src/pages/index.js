import React from "react";
import { getSession, useSession } from "next-auth/client";

export default function Index() {
  const [session] = useSession();

  if (session) {
    return (
      <div className="align-center">
        <h1 data-cy="welcome-text">Velkommen til Merkur</h1>
      </div>
    );
  } else {
    return (
      <div className="align-center">
        <h1 data-cy="welcome-text">
          Du har ikke adgang til Merkur. Log venligst ind.
        </h1>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  return {
    props: { session },
  };
}
