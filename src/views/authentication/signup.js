import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Signup } from '../../api/auth';
import { Signin, signInWithGoogle } from "../../api/auth";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { FaBoxOpen } from "react-icons/fa";
import { withStyles } from "@material-ui/core/styles";
import {db} from "../../api/firebase";
import logo from "../../assets/images/logo.png";
import LanderHeader from "../../components/Headers/Header";
import Box from "@material-ui/core/Box";
import mmlogo from "../../assets/images/mmlogo.png"
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
            let channelID = Date.now().toString() + Math.random().toString()
            await db.collection('channels').doc(channelID).set({
                bio:'null',
                channelID:channelID,
                color: '#886cfa',
                flow: '{"elements":[{"id":"node_1623933798037","draggable":true,"type":"thoughtNodes","data":{"text":"{\\"blocks\\":[{\\"key\\":\\"3lrve\\",\\"text\\":\\"Cylium is a super simple personal note taking space. Designed for writing down quick notes or thoughts as they come to you throughout the day.  \\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}","isOpen":false,"style":{"bgColor":"white","borderColor":"#8E9CFD","borderRadius":10,"border":0,"shadow":"0px 3px 10px rgba(0, 0, 0, 0.08)"},"title":"Welcome to Cylium!","isConnectable":false,"id":"node_1623933798037","type":"thoughtNodes","user":{"name":null,"channelIDs":["16239337933670.6313380599602103"],"email":"superuser@test.com","img_url_Profile":{"imgUrl":null},"projectIDs":{"16239337933670.6313380599602103":{"zoom":1.1117557584341544,"viewPort":[-196.2928901199615,-109.46117199911134]}},"theme":"light","projects":["16239337933670.6313380599602103"]},"hasTitle":true,"icon":"🧠"},"position":{"x":358,"y":287}},{"id":"node_1623933864305","draggable":true,"type":"thoughtNodes","data":{"text":"{\\"blocks\\":[{\\"key\\":\\"audec\\",\\"text\\":\\"To add a note, just click the brain icon on the right panel. \\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}},{\\"key\\":\\"4k7hv\\",\\"text\\":\\"To select many notes at once hold down the shift key and drag. You can delete selected notes by simply pressing the delete key. \\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}},{\\"key\\":\\"ahaia\\",\\"text\\":\\"To zoom into a note, double click on it. \\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}},{\\"key\\":\\"381fp\\",\\"text\\":\\"To change your theme to \'dark mode\' click on the avatar icon on the top right. \\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}","isOpen":true,"style":{"bgColor":"white","borderColor":"#8E9CFD","borderRadius":10,"border":0,"shadow":"0px 3px 10px rgba(0, 0, 0, 0.08)"},"title":null,"isConnectable":false,"id":"node_1623933864305","type":"thoughtNodes","user":{"name":null,"channelIDs":["16239337933670.6313380599602103"],"email":"superuser@test.com","img_url_Profile":{"imgUrl":null},"projectIDs":{"16239337933670.6313380599602103":{"zoom":1.1117557584341544,"viewPort":[-196.2928901199615,-109.46117199911134]}},"theme":"light","projects":["16239337933670.6313380599602103"]}},"position":{"x":778,"y":286}},{"id":"node_1623934132259","draggable":true,"type":"thoughtNodes","data":{"text":"{\\"blocks\\":[{\\"key\\":\\"3gr3d\\",\\"text\\":\\"Woohooo! \\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}","isOpen":false,"style":{"bgColor":"white","borderColor":"#8E9CFD","borderRadius":10,"border":0,"shadow":"0px 3px 10px rgba(0, 0, 0, 0.08)"},"title":"Happy Thinking","isConnectable":false,"id":"node_1623934132259","type":"thoughtNodes","user":{"name":null,"channelIDs":["16239337933670.6313380599602103"],"email":"superuser@test.com","img_url_Profile":{"imgUrl":null},"projectIDs":{"16239337933670.6313380599602103":{"zoom":1.1117557584341544,"viewPort":[-196.2928901199615,-109.46117199911134]}},"theme":"light","projects":["16239337933670.6313380599602103"]},"hasTitle":true,"icon":"🕺"},"position":{"x":356,"y":506.93333333333317}}],"position":[-196.2928901199615,-109.46117199911134],"zoom":1.1117557584341544}'


            })

            let projectIDs = {}
            projectIDs[channelID] = {viewPort: [0,0], zoom: 1}
            console.log(projectIDs)

            await db.collection("users").doc(this.state.email).set({
                email: this.state.email,
                img_url_Profile: {imgUrl: null},
                name: null,
                channelIDs: [channelID],
                projects: [channelID],
                projectIDs: projectIDs,
                theme:'light',

            }).then(function() {
                console.log("DocumentApp successfully written!");
            }).catch(function(error) {
                console.error("Error writing document: ", error);
            });

            await Signup(this.state.email, this.state.password);




            // analytics.logEvent('user signed up');

        } catch (error) {
            this.setState({ error: error.message });
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
            <LanderHeader/>
            <Container component="main" maxWidth="xs">
                <CssBaseline>

                    <div className={classes.paper}>
                        <p style = {{fontSize: 35, fontWeight: 800, margin: 30, color:"#10102F"}}>🧠 Cylium </p>
                        <p style = {{fontSize: 25, fontWeight: 600, marginTop: 0, marginBottom: 10, color:"#10102F"}}> Sign Up</p>
                        {/*<p>Fill in the form below to create an account.</p>*/}
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
