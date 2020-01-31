import React, { useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import Index from "views/Index.jsx";
import Landing from "views/examples/Landing.jsx";
import Login from "views/auth/Login";
import SingleItem from "views/items/SingleItem/SingleItem";
import Register from "views/auth/Register.jsx";
import AuthContext from "./context/auth-context";
import LostItem from "views/items/LostItem";
import Items from "views/items/Items";

const App = props => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider
          value={{
            token: token,
            userId: userId,
            login: login,
            logout: logout
          }}
        >
          <main className="main-content">
            <Switch>
              <Route path="/" exact render={props => <Index {...props} />} />
              <Route
                path="/landing-page"
                exact
                render={props => <Landing {...props} />}
              />
              <Route
                path="/objeto-perdido"
                exact
                render={props => <LostItem {...props} />}
              />
              <Route
                path="/objeto-encontrado"
                exact
                render={props => <LostItem {...props} />}
              />
              <Route
                path="/objetos-publicados"
                exact
                render={props => <Items {...props} />}
              />
              {!token && (
                <Route
                  path="/login-page"
                  exact
                  render={props => <Login {...props} />}
                />
              )}

              <Route
                path="/detalle"
                exact
                render={props => <SingleItem {...props} />}
              />
              {!token && (
                <Route
                  path="/register-page"
                  exact
                  render={props => <Register {...props} />}
                />
              )}

              <Redirect to="/" />
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
