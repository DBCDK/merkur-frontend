import "bootstrap/dist/css/bootstrap.min.css";
import "../css/styles.css";
import {Provider, getSession} from "next-auth/client";
import Footer from "@/components/Footer";
import {Sidebar} from "@/components/Sidebar";
import PropTypes from "prop-types";
import Header from "@/components/Header";

// This default export is required in a new `pages/_app.js` file.
function MyApp({Component, pageProps}) {
    return (
        <Provider session={pageProps.session}>
            <Header/>
            <Sidebar/>
            <div id="main">
                <Component Component={Component} {...pageProps}/>
            </div>
            <Footer/>
        </Provider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object,
};

export async function getServerSideProps() {
    const session = await getSession();
    return {
        props: {session},
    };
}

export default MyApp;
