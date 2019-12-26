/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

{
  /*

 import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import Index from "views/Index.jsx";
import Landing from "views/examples/Landing.jsx";
import Login from "views/Login.jsx";
import Profile from "views/examples/Profile.jsx";
import Register from "views/Register.jsx";
import AuthContext from "./context/auth-context";

state = {
  token: null,
  userId: null
};

login = (token, userId, tokenExpiration) => {
  this.setState({ token: token, userId: userId });
};

logout = () => {
  this.setState({ token: null, userId: null });
};

ReactDOM.render(
  <BrowserRouter>
    <AuthContext.Provider
      value={{
        token: this.state.token,
        userId: this.state.userId,
        login: this.login,
        logout: this.logout
      }}
    >
      <Switch>
        <Route path='/' exact render={props => <Index {...props} />} />
        <Route
          path='/landing-page'
          exact
          render={props => <Landing {...props} />}
        />
        <Route
          path='/login-page'
          exact
          render={props => <Login {...props} />}
        />
        <Route
          path='/profile-page'
          exact
          render={props => <Profile {...props} />}
        />
        <Route
          path='/register-page'
          exact
          render={props => <Register {...props} />}
        />
        <Redirect to='/' />
      </Switch>
    </AuthContext.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);


 */
}
