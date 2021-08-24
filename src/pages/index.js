import React from "react";
import { Sidebar } from "@/components/sidebar";
import { useSession } from "next-auth/client";
import { signIn, signOut } from "@dbcdk/login-nextjs/client";

export default function Index() {
  const [session] = useSession();
  return (
    <div className="align-center">
      <header>
        <div>
          <h4>DBCs Posthus</h4>
          {!session && (
            <>
              <button style={{ float: "right" }} onClick={() => signIn()}>
                Sign in
              </button>
            </>
          )}
          {session && (
            <>
              - {session.user.id} <br />
              <button onClick={() => signOut()}>Log ud</button>
              <div>{name}</div>;
            </>
          )}
        </div>
      </header>
      <div>
        <Sidebar />
        {/*<Main/>*/}
      </div>
      <footer>
        <div>
          <p>
            Kundeservice +45 44 86 77 11 (Mandag - fredag 8:30 - 15:30).{" "}
            <a href="https://kundeservice.dbc.dk/">kundeservice.dbc.dk</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
