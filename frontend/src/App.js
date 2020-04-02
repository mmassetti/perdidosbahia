import React, { useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import Index from "components/Index";
import Landing from "components/theme/examples/Landing.jsx";
import Login from "components/core/auth/Login";
import SingleItem from "components/core/items/SingleItem/SingleItem";
import Register from "components/core/auth/Register.jsx";
import AuthContext from "./context/auth-context";
import LostItem from "components/core/items/LostItem";
import Items from "components/core/items/Items";
import UserClaims from "components/core/claims/UserClaims";

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
                  path="/inicio-sesion"
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
                  path="/registro"
                  exact
                  render={props => <Register {...props} />}
                />
              )}

              <Route
                path="/mis-publicaciones"
                exact
                render={props => <UserClaims {...props} />}
              />

              <Redirect to="/" />
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
