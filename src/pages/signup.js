import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Signup } from '../helpers/auth';
import { Signin, signInWithGoogle } from "../helpers/auth";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { FaBoxOpen } from "react-icons/fa";
import { withStyles } from "@material-ui/core/styles";
import {db} from "../api/firebase";
import logo from "../assets/images/logo.png";
import Header from "../components/Header";
import Box from "@material-ui/core/Box";
import boxx from "../assets/images/boxx.png"


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
            await db.collection("users").doc(this.state.email).set({
                email: this.state.email,
                url: Date.now(),
                img_url_Profile: {imgUrl: null},
                welcome: "....",
                name: "add a name"

            }).then(function() {
                console.log("Document successfully written!");
            }).catch(function(error) {
                console.error("Error writing document: ", error);
            });

            await db.collection("feedback").doc(this.state.email).set({
                email: this.state.email,
                url: Date.now(),
                img_url_Profile: {imgUrl: null},
                welcome: "....",
                name: "add a name"

            }).then(function() {
                console.log("Document successfully written!");
            }).catch(function(error) {
                console.error("Error writing document: ", error);
            });
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

                        <p style = {{fontSize: 50, fontWeight: 600, marginTop: 0, marginBottom: 10, color:"#10102F"}}> Sign Up</p>

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
                    {/*<p>Or</p>*/}
                    {/*<button onClick={this.googleSignIn} type="button">*/}
                    {/*    Sign up with Google*/}
                    {/*</button>*/}
                    {/*<hr></hr>*/}
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
                </CssBaseline>
            </Container>
        </div>
        )

    }
}

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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


export default withStyles(styles, { withTheme: true })(signup);

