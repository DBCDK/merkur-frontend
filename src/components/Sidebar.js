import React from "react";
import Link from "next/link";
import styles from "@/components/Sidebar.module.css";

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <nav id="sidebar">
        <ul>
          <li>
            <Link href="/converted">
              <a>Konverteringsservice</a>
            </Link>
          </li>
          <li>
            <Link href="/delivered">
              <a>Dataleverancer</a>
            </Link>
          </li>
          <li>
            <a
              href="http://dbcposthus.dbc.dk/dataleverancer/index.php"
              target="_blank"
            >
              Det gamle DBC-posthus
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
