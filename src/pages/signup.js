import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Signup } from '../helpers/auth';
import { Signin, signInWithGoogle } from "../helpers/auth";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link as L} from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FaBoxOpen } from "react-icons/fa";


import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    paper: {
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async googleSignIn() {
        try {
            await signInWithGoogle();
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
            await Signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline>

                    <div className={classes.paper}>
                        <FaBoxOpen size = {50} />

                        <h1>
                            Sign Up to <Link to="/">FeedBoxx</Link>
                        </h1>
                        <p>Fill in the form below to create an account.</p>
                        <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="Email"
                                        name="email" type="email"
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={this.handleChange}
                                        value={this.state.password}
                                        type="password"
                                    />
                                </Grid>
                            </Grid>

                            <div>
                                {this.state.error ? <p>{this.state.error}</p> : null}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign Up
                                </Button>
                            </div>

                        </form>
                    </div>


                <div>
                <form onSubmit={this.handleSubmit}>

                    {/*<div>*/}
                    {/*    <input*/}
                    {/*        placeholder="Email"*/}
                    {/*        name="email" type="email"*/}
                    {/*        onChange={this.handleChange}*/}
                    {/*        value={this.state.email}></input>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <input*/}
                    {/*        placeholder="Password"*/}
                    {/*        name="password"*/}
                    {/*        onChange={this.handleChange}*/}
                    {/*        value={this.state.password}*/}
                    {/*        type="password"></input>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    {this.state.error ? <p>{this.state.error}</p> : null}*/}
                    {/*    <button type="submit">Sign up</button>*/}
                    {/*</div>*/}
                    <p>Or</p>
                    <button onClick={this.googleSignIn} type="button">
                        Sign up with Google
                    </button>
                    <hr></hr>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
                </CssBaseline>
            </Container>
        )
    }
}

export default withStyles(styles, { withTheme: true })(signup);

