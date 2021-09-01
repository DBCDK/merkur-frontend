import React from "react";
import Link from "next/link";
import styles from "@/components/Sidebar.module.css";
import {useRouter} from "next/router";

export function Sidebar() {
    const router = useRouter();

    return (
        <div className={styles.sidebar}>
            <nav id="sidebar">
                <ul>
                    <li>
                        <Link href="/conversions">
                            <a>Konverteringsservice</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/periodic-jobs">
                            <a>Dataleverancer</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/upload">
                            <a>Upload af fil</a>
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
}
