import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";
import logo from "../assets/images/logo.png";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import boxx from "../assets/images/boxx.png"
import Header from "../components/Header";

import { FaBoxOpen } from "react-icons/fa";


class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: "" });
        try {
            console.log(this.state.email, this.state.password)
            await Signin(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header/>
            <Container component="main" maxWidth="xs">
                <CssBaseline>
                    <div className={classes.paper}>
                        <img style ={{height: 50}}src = {boxx} />

                        <p style = {{fontSize: 50, fontWeight: 600, marginTop: 0, marginBottom: 10, color:"#10102F"}}> Login</p>

                        <p>Fill in the form below to create an account.</p>

                        <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                placeholder="Email"
                                type="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                id="password"
                                autoComplete="current-password"
                                placeholder="Password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                type="password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                            {this.state.error ? (
                                <p>{this.state.error}</p>
                            ) : null}
                            {/*<button type="submit">Login</button>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </form>

                    <div>
                        <form
                            autoComplete="off"
                            onSubmit={this.handleSubmit}
                        >
                            <p>
                                Don't have an account? <Link to="/signup">Sign up</Link>
                            </p>
                        </form>
                    </div>
                    </div>
                </CssBaseline>
            </Container>
            </div>
        );
    }
}


const styles = theme => ({    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


export default withStyles(styles, { withTheme: true })(login);
