import "bootstrap/dist/css/bootstrap.min.css";
import "../css/styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {session}
    };
}
