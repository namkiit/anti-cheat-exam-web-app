import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "../store/index";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material";
import DisableDevTools from "../components/non-render/disable-devtools";

const theme = createTheme({
  typography: {
    fontFamily: `"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps?.session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Anti-Cheat Exam App</title>
            <meta name="author" content="Nguyen Nam Kiet" />
          </Head>
          <Component {...pageProps} />
          <ToastContainer position="bottom-center" theme="light" />
          <DisableDevTools />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
