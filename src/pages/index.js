import React from "react";
import {useSession} from "next-auth/client";

export default function Index() {
    const [session] = useSession();
    if (!session?.id) {
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
