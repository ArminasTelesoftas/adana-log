import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { appStore } from "./App.store";
import { Provider } from "react-redux";
import { Api } from "./api.config";
import { HashRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://bc323f51f2dc4f67a19db9c9aad5fe7d@o526697.ingest.sentry.io/5642130",
  integrations: [new Integrations.BrowserTracing()],
  // I know its stupid check for dev env
  environment: window.location.href.includes("localhost") ? "development" : "production",
  tracesSampleRate: 1.0,
});

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: "#9c27b0",
      main: "#1769aa",
      // main: "#618833",
    },
    secondary: {
      main: "#FFFFFF",
    },
    background: {
      default: "#F6F6F6",
      paper: "#FFF",
    },
  },
});

export const api = new Api(appStore);

ReactDOM.render(
  // <React.StrictMode>
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={appStore}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </MuiThemeProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
