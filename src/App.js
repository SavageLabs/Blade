import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxStore from "./ReduxStore";
import history from "./history";
import Home from "./views/Home";
import Menu from "./global/Menu";
import Navbar from "./global/Navbar";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./global/Theme";
import ConnectionManager from "./views/ConnectionManager";
import AuthDialog from "./global/AuthDialog";
import { PersistGate } from 'redux-persist/integration/react'


const Wrapper = ({ children }) => {
  return <div>{children}</div>;
};

function App() {
  return (
    <Router history={history}>
      <Provider store={ReduxStore.store}>
      <PersistGate loading={null} persistor={ReduxStore.persistor}>

        <Wrapper>
          <ThemeProvider theme={theme}>
            <Navbar />
            <Menu />
            <AuthDialog />
            <Switch>
              <Route path={"/"} component={Home} exact />
              <Route path={"/conn/:connid"} component={Home} exact />
              <Route
                path={"/addconnection"}
                component={ConnectionManager}
                exact
              />
            </Switch>
          </ThemeProvider>
        </Wrapper>
        </PersistGate>

      </Provider>
    </Router>
  );
}

export default App;
