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

let intro =
    `{"blocks":[{"key":"fvjfl","text":"Hey there!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"40m60","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1b694","text":"Get started with FeedBoxx in three steps! ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2l9pm","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4nje3","text":"1.) Personalize your FeedBoxx 💁","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":31,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"ap7ne","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ea14i","text":"Go to your My Boxx tab on the left and personalize your FeedBoxx with a profile picture, display name, and welcome message.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":10,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"96pmh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f2akr","text":"2.) Link your FeedBoxx 🔗","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9at5b","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bsr55","text":"Add your unique Feedboxx link anywhere. We recommend your email signature, but you can get creative - websites, blog posts, slack, etc., are all great places to source feedback. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":10,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"7dif8","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eat4r","text":"3.) Turn on notifications ✉️","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":28,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"bcu00","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4scj7","text":"If you want to receive email notifications when you get new feedback, make sure to turn on notifications. You can change this at any time. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cqpmb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bil6u","text":"Feel free to email us at help@feedboxx.io with any questions. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":25,"length":16,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"8hrf0","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ahq9v","text":"Enjoy,","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7b91m","text":"The FeedBoxx Team ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7aq66","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9fpdi","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ec4qj","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`

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
            let url = Date.now();
            await Signup(this.state.email, this.state.password);
            await db.collection("users").doc(this.state.email).set({
                email: this.state.email,
                url: url,
                img_url_Profile: {imgUrl: null},
                welcome: "....",
                name: "add a name"

            }).then(function() {
                console.log("Document successfully written!");
            }).catch(function(error) {
                console.error("Error writing document: ", error);
            });

            const res = await db.collection('feedback').add({
                email: "help@feedboxx.io",
                url: url.toString(),
                subject: "Welcome to your Feedboxx! 🗳️🤗",
                feedback: intro,
                name: "The FeedBoxx Team",
                timeStamp: new Date(),
                anon: false,

            }).then(function() {
                console.log("Feedback written successfully!");
            }).catch(function(error) {
                console.error("Error writing document: ", error);
            });



            db.collection('feedback').doc(res.id).update({
                id: res.id


            }).then(function() {
                console.log("Feedback ID added successfully!");
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

