import React from "react";
import Link from 'next/link'
import {oldDbcPosthusLink} from "@/constants";


export function Sidebar() {

    return (
        <div className="wrapper">
            <nav id="sidebar">
                <ul>
                    <li><Link href="/converted"><a>Konverteringsservice</a></Link></li>
                    <li><Link href="/delivered"><a>Dataleverancer</a></Link></li>
                    <li><Link href="/upload"><a>Upload af fil</a></Link></li>
                    <li><a href="http://dbcposthus.dbc.dk/dataleverancer/index.php" target="_blank">Det gamle DBC-posthus</a></li>
                </ul>
            </nav>
        </div>);
}
