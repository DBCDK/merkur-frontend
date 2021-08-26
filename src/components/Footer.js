import React from "react";
import styles from "@/components/Footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footer}>
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
