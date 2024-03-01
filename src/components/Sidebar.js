import React from "react";
import Link from "next/link";
import styles from "@/components/Sidebar.module.css";

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <nav id="sidebar">
        <ul>
          <li>
            <Link href="/converted">Konverteringsservice</Link>
          </li>
          <li>
            <Link href="/delivered">Dataleverancer</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
