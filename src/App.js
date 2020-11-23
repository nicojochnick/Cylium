import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import home from './pages/home';
import feed from './pages/feed'
import signup from './pages/signup';
import login from './pages/login';
import {auth} from './api/firebase';


function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
      <Route
          {...rest}
          render={(props) => authenticated === true
              ? <Component {...props} />
              : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
      />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
      <Route
          {...rest}
          render={props =>
              authenticated === false ? (
                  <Component {...props} />
              ) : (
                  <Redirect to="/feed" />
              )
          }
      />
  );
}

export default class App extends Component {
    constructor() {
      super();
      this.state = {
        authenticated: false,
        loading: true
      };
    }

    componentDidMount() {
      auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({
            authenticated: true,
            loading: false
          });
        } else {
          this.setState({
            authenticated: false,
            loading: false
          });
        }
      });
    }

    render() {
      return this.state.loading === true ? (
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
      ) : (
          <Router>
            <Switch>
              <Route exact path="/" component={home} />
              <PrivateRoute
                  path="/chat"
                  authenticated={this.state.authenticated}
                  component={feed}
              />
              <PublicRoute
                  path="/signup"
                  authenticated={this.state.authenticated}
                  component={signup}
              />
              <PublicRoute
                  path="/login"
                  authenticated={this.state.authenticated}
                  component={login}
              />
            </Switch>
          </Router>
      );
    }
  }


