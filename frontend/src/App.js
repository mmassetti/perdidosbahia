import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import Index from "components/Index";
import Login from "components/core/auth/Login";
import SingleItem from "components/core/items/SingleItem/SingleItem";
import Register from "components/core/auth/Register.jsx";
import AuthContext from "common/providers/AuthProvider/auth-context";

import LostItem from "components/core/items/LostItem";
import Items from "components/core/items/Items";
import UserClaims from "components/core/claims/UserClaims";
import ErrorPage from "components/core/Helpers/ErrorPage/ErrorPage";

import APIErrorProvider from "common/providers/APIErrorProvider";
import APIErrorNotification from "components/APIErrorNotification";
import MustLoginModal from "components/core/Helpers/MustLoginModal";

const App = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      const tokenExpiration = localStorage.getItem("expirationDate");
      const expirationDateInSeconds = new Date(tokenExpiration).getTime();
      const dateDifference =
        (expirationDateInSeconds - new Date().getTime()) / 3600000;

      if (new Date(tokenExpiration) <= new Date()) {
        logout();
      } else {
        login(
          userToken,
          localStorage.getItem("userId"),
          dateDifference,
          localStorage.getItem("firstName")
        );
      }
    }
  });

  const login = (token, userId, tokenExpiration, firstName) => {
    setToken(token);
    setUserId(userId);
    setFirstName(firstName);
    localStorage.setItem("token", token);
    const expirationDate = new Date(
      new Date().getTime() + tokenExpiration * 3600000
    );
    if (expirationDate) {
      localStorage.setItem("expirationDate", expirationDate);
    }
    localStorage.setItem("userId", userId);
    localStorage.setItem("firstName", firstName);
    return <Redirect to="/" />;
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setFirstName(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("firstName");
    //TODO: Achive this behavior:
    // if (!localStorage.getItem("token")) {
    //   return <MustLoginModal isShowing="true" />;
    // }
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          login: login,
          logout: logout,
          firstName: firstName,
        }}
      >
        <APIErrorProvider>
          <main className="main-content">
            <Switch>
              <Route path="/" exact render={(props) => <Index {...props} />} />
              <Route
                path="/objeto-perdido"
                exact
                render={(props) => <LostItem {...props} />}
              />
              <Route
                path="/objeto-encontrado"
                exact
                render={(props) => <LostItem {...props} />}
              />
              <Route
                path="/objetos-publicados"
                exact
                render={(props) => <Items {...props} />}
              />
              {!token && (
                <Route
                  path="/inicio-sesion"
                  exact
                  render={(props) => <Login {...props} />}
                />
              )}

              <Route
                path="/detalle"
                exact
                render={(props) => <SingleItem {...props} />}
              />
              {!token && (
                <Route
                  path="/registro"
                  exact
                  render={(props) => <Register {...props} />}
                />
              )}

              <Route
                path="/mis-publicaciones"
                exact
                render={(props) => <UserClaims {...props} />}
              />

              <Redirect from="/inicio-sesion" to="/" exact />
              <Redirect from="/argon-design-system-react" to="/" exact />

              <Route render={(props) => <ErrorPage {...props} />} />
            </Switch>
          </main>
          <APIErrorNotification />
        </APIErrorProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
