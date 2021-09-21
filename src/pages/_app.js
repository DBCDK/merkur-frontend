import "bootstrap/dist/css/bootstrap.min.css";
import "../css/styles.css";
import { Provider } from "next-auth/client";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import PropTypes from "prop-types";
import Header from "@/components/Header";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Header />
      <Sidebar loginAgency={pageProps?.session?.user?.netpunktAgency} />
      <div id="main">
        <Component {...pageProps} />
      </div>
      <Footer />
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;
