import React, { Component } from "react";
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

class App extends Component {
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

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
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
                {!this.state.token && (
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
                {!this.state.token && (
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
  }
}

export default App;
