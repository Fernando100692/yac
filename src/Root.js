import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import configureStore from "./store/configStore";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>  
      </Router>
    </Provider>
  );
}

export default Root;