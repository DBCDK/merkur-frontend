import "bootstrap/dist/css/bootstrap.min.css";
import "../css/styles.css";
import { SessionProvider } from "next-auth/react";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import PropTypes from "prop-types";
import Header from "@/components/Header";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header session={pageProps.session} />
      <title>DBCs Posthus</title>
      <Sidebar loginAgency={pageProps?.session?.user?.netpunktAgency} />
      <div id="main">
        <Component {...pageProps} />
      </div>
      <Footer />
    </SessionProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;
