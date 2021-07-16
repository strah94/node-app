import "./App.css";

import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthState from "./context/auth/AuthState";
import PrivateRoute from "./components/routing/PrivateRoute";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  return (
    <AuthState>
      <div>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/forgotPassword"
                  component={ForgotPassword}
                />
                <Route
                  exact
                  path="/resetPassword/:id"
                  component={ResetPassword}
                />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </div>
    </AuthState>
  );
}

export default App;
