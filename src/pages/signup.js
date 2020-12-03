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
import {analytics} from "../api/firebase";

let intro = `{"blocks":[{"key":"8brqe","text":"Get started with FeedBoxx in three steps!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"468lu","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fnhn6","text":"1.) Personalize your FeedBoxx 💁","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":31,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"edmo0","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9omk3","text":"Go to the My Boxx tab to personalize your FeedBoxx with a profile picture, display name, and welcome message. Make it yours!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":9,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"abdrv","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aeecn","text":"2.) Link your FeedBoxx 🔗","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"87ufd","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5mj2k","text":"Add your unique Feedboxx link anywhere. We recommend using it in your work email signature but get creative - websites, blog posts, slack, etc., are all great places to source feedback.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":10,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"ctkkm","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8k53g","text":"3.) Turn on Send to Email ✉️","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":28,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9lfd3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b6ujq","text":"Turn on \\"Send to Email\\" (on your right) to get your feedback sent directly to your inbox. Turn it off anytime.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5a5ee","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c67br","text":"Questions? Email us at help@feedboxx.io","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":23,"length":16,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"6nmri","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"518uv","text":"Enjoy,","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1n1fm","text":"The FeedBoxx Team","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"edfhk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`
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
                subject: "Welcome to Feedboxx! 🗳️🤗",
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

            // analytics.logEvent('user signed up');

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

