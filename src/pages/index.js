import React from "react";

export default function Index() {
    return (
        <div className="align-center">
            <h1>Hello world!</h1>
        </div>
    );
}

export async function getServerSideProps() {
    return {
        props: {},
    };
}
