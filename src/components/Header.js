import React from "react";
import {useSession} from "next-auth/client";
import {signIn, signOut} from "@dbcdk/login-nextjs/client";
import styles from "@/components/Header.module.css"

export const Header = () => {
    const [session] = useSession();
    return (
        <div className={styles.header}>
            <header>
                <div>
                    {!session && (
                        <>
                            <h4>DBCs Posthus
                                <a onClick={() => signIn()}>
                                    Log ind
                                </a>
                            </h4>
                        </>
                    )}
                    {session && (
                        <>
                            <h4>
                                DBCs Posthus - {session.user.netpunktAgency}
                                <a onClick={() => signOut()}>
                                    Log ud
                                </a>
                            </h4>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Header;
