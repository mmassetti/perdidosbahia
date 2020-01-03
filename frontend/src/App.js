import React, { useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import Index from "views/Index.jsx";
import Landing from "views/examples/Landing.jsx";
import Login from "views/auth/Login";
import Profile from "views/examples/Profile.jsx";
import Register from "views/auth/Register.jsx";
import AuthContext from "./context/auth-context";
import LostItem from "views/items/LostItem";

const App = props => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
    // this.setState({ token: token, userId: userId });
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    // this.setState({ token: null, userId: null });
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
          <main className='main-content'>
            <Switch>
              <Route path='/' exact render={props => <Index {...props} />} />
              <Route
                path='/landing-page'
                exact
                render={props => <Landing {...props} />}
              />
              <Route
                path='/objeto-perdido'
                exact
                render={props => <LostItem {...props} />}
              />
              {!token && (
                <Route
                  path='/login-page'
                  exact
                  render={props => <Login {...props} />}
                />
              )}

              <Route
                path='/profile-page'
                exact
                render={props => <Profile {...props} />}
              />
              {!token && (
                <Route
                  path='/register-page'
                  exact
                  render={props => <Register {...props} />}
                />
              )}

              <Redirect to='/' />
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
