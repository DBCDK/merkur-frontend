import React from "react";
import {Sidebar} from "@/components/sidebar";

export default function Index() {
  return (
    <div className="align-center">
      <header><div><h4>DBCs Posthus</h4></div></header>
      <div>
        <Sidebar/>
        {/*<Main/>*/}
      </div>
      <footer>
        <div>
          <p>Kundeservice +45 44 86 77 11 (Mandag - fredag 8:30 - 15:30). <a href="https://kundeservice.dbc.dk/">kundeservice.dbc.dk</a></p>
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
