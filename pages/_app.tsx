import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "../store/index";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material";
import DisableHotkeysAndDevTools from "../components/non-render/disable-hotkeys-and-devtools";

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
            <title>Auto-Proctoring Exam App</title>
            <meta name="author" content="Nguyen Nam Kiet" />
          </Head>
          <Component {...pageProps} />
          <ToastContainer position="bottom-center" theme="light" />
          <DisableHotkeysAndDevTools />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
