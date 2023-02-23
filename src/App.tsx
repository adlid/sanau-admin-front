import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Routes } from "./routes/Routes";
import { ScrollToTop } from "./routes/ScrollToTop";
import { NotistackRedirect } from "./components/NotistackRedirect";
import { SnackbarProvider } from "notistack";
import { store } from "./store/store";

const App: FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <SnackbarProvider
          preventDuplicate
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <ScrollToTop />
          <NotistackRedirect /> 
          <Routes />
        </SnackbarProvider>
      </Provider>
    </Router>
  );
};

export { App };
