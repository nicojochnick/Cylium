import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Signup } from '../../helpers/auth';
import { Signin, signInWithGoogle } from "../../helpers/auth";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { FaBoxOpen } from "react-icons/fa";
import { withStyles } from "@material-ui/core/styles";
import {db} from "../../api/firebase";
import logo from "../../assets/images/logo.png";
import Header from "../../components/Utilities/Header";
import Box from "@material-ui/core/Box";
import boxx from "../../assets/images/boxx.png"
import {analytics} from "../../api/firebase";

let intro = `{"blocks":[{"key":"48n69","text":"Hi there!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4p1p2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cl4n2","text":"Feedboxx helps you source and reward more feedback. Here is a quick guide to getting started.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1tff8","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"140sn","text":"Step 1. Customize your FeedBoxx","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":31,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"4vkem","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"anmju","text":"Your FeedBoxx is where people can give you feedback. Make yours unique by going to the Edit tab and adding a profile picture, name, and welcome message. Click on My FeedBoxx to see your live changes.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":87,"length":5,"style":"BOLD"},{"offset":162,"length":12,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"fpfp9","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"upml","text":"Step 2. Add your FeedBoxx URL to your email signature","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":53,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"3o0tj","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6eomh","text":"Share your FeedBoxx URL in your email signature. Just copy and paste your URL under Copy. Here is a sample signature:","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":84,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"3ms2u","text":"---------------------------------","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fq775","text":"John Doe","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4dlml","text":"Account Executive","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"io4j","text":"Feedback? Let me know here.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":22,"length":5,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ak39k","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"92rlf","text":"Step 3. Send Thank You Messages","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":31,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9d9a7","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fgpb","text":"You can send a quick thank you message to the best feedback by clicking on Send Thank You. You can optionally attach FeedBoxx points or gift cards to your thank you message.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":75,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"cacp3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8keea","text":"Feeboxx points are redeemable for real $. Click Add to add more points or click Cash Out to turn your points into $. The conversion is 10 points = $1.00.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":48,"length":3,"style":"BOLD"},{"offset":80,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"1rtau","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fmfrm","text":"We gifted you 25 points to start :)","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d8p5","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"65ub4","text":"Questions? Email us at help@feedboxx.io.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bme8n","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"45tef","text":"Enjoy,","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"16tai","text":"The FeedBoxx Team","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dcj0s","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dnci","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`

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
                img_url_Profile: {imgUrl: null},
                name: null,
                channelIDs: [],
                projects: [],
                projectIDs: {}

            }).then(function() {
                console.log("Document successfully written!");
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


{/*<p>Or</p>*/}
{/*<button onClick={this.googleSignIn} type="button">*/}
{/*    Sign up with Google*/}
{/*</button>*/}
{/*<hr></hr>*/}
