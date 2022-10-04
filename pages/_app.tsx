import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import PhoneLayout from "../components/layouts/PhoneLayout";
import { useEffect } from "react";
import setDarkMode from "../app/funcs/setDarkMode";

function MyApp({ Component, pageProps }: AppProps) {
    const Layout = PhoneLayout;
    useEffect(() => {
        const darkMode = localStorage.getItem("dark_mode");
        if (darkMode !== null) setDarkMode(darkMode);
        else localStorage.setItem("dark_mode", "off");
    }, []);
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
