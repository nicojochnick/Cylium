import React, { Component } from "react";
import {BrowserRouter as Router, HashRouter, Switch, Route, Link, Redirect,useParams} from "react-router-dom";
import home from './pages/home';
import Dashboard from './pages/dashboard'
import signup from './pages/signup';
import Feedbox from './views/Old/feedbox'
import login from './pages/login';
import {auth} from './api/firebase';
import './styles.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4D6DF1'
        },
        secondary:{
            main:'#F4F4F4'
        }
    }
});

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
          <MuiThemeProvider theme={theme}>

          <Router>
            <Switch>
              <Route exact path="/" component={home} />
              <PrivateRoute
                  path="/feed"
                  authenticated={this.state.authenticated}
                  component={Dashboard}
              />

                <PrivateRoute
                    path="/feedboxx-edit"
                    authenticated={this.state.authenticated}
                    component={Dashboard}
                />
              <PublicRoute
                  path="/signup"
                  authenticated={this.state.authenticated}
                  component={signup}
              />

              <Route
                    path="/feedboxx/:id"
                    render={(props) => <Feedbox {...props} />}
              />
              <PublicRoute
                  path="/login"
                  authenticated={this.state.authenticated}
                  component={login}
              />
            </Switch>
          </Router>
          </MuiThemeProvider>
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


