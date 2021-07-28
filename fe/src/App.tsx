import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import mainTheme from "./constants/mainTheme";
import AuthenticationWrapper from "./wrappers/AuthenticationWrapper";
import store from "./redux/store";
import LoadingWrapper from "./wrappers/LoadingWrapper";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <LoadingWrapper>
          <AuthenticationWrapper />
        </LoadingWrapper>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
