import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route, Link, Redirect,} from "react-router-dom";
import home from './pages/home';
import Feed from './pages/feed'
import signup from './pages/signup';
import login from './pages/login';
import {auth} from './api/firebase';
import './styles.css';

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
          console.log(this);
        if (user) {
          this.setState({
            authenticated: true,
            loading: false
          });
        } else {
            console.log(this);
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
                  path="/feed"
                  authenticated={this.state.authenticated}
                  component={Feed}
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


