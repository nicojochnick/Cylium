import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import Url from '../components/URL'
import firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from "../api/firebase";
import Feedback from "../components/feedback"
import {auth} from "../api/firebase";
import moment from 'moment';
import RewardTracker from "../components/rewardTracker";
import Divider from "@material-ui/core/Divider";
import Pulse from "../assets/images/pulse.gif"
import FeedbackTracker from "../components/feedbackTracker";
import NetworkBrowse from "../components/Network/networkBrowse";
import ShareBoxx from "../components/Share/shareBoxx";


function Feed(props) {
    const classes = useStyles();
    const [feed, setFeed] = React.useState([]);
    const [url, setURL] = React.useState(null);

    const handleDelete = async(id) => {

        await db.collection('feedback').doc(id).delete();


    };

    const makeChrono = (feed) => {
        feed.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            console.log(a.timeStamp)
            return b.timeStamp - a.timeStamp;
        });

        console.log(feed)

        setFeed(feed)
    };
    useEffect(() => {
        let email = firebase.auth().currentUser.email;
        db.collection("feedback").where('url', '==', props.url.toString())
            .onSnapshot(function (querySnapshot) {
                let feedback = [];
                querySnapshot.forEach(function (doc) {
                    feedback.push(doc.data());
                });
                makeChrono(feedback);
                console.log(feedback)
            });



    }, []);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root} >
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={1} xs={12}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Box className={classes.box} boxShadow = {3}>
                            <Grid justify="space-between" direction = "row" container >
                                <h2
                                    style ={{
                                        margin: 15,
                                        marginRight: -10,
                                        color:"#9FA5B1",
                                        fontSize: 15,
                                        fontWeight: 600
                                    }}>
                                    FEEDBACK
                                </h2>
                            <img style={{height: 60, margin: 0}} src={Pulse}/>
                            </Grid>

                            <Divider style ={{marginTop:0}}/>

                            {feed.map((item) =>
                                    <Feedback handleDelete = {handleDelete} item = {item}/>
                                    )}

                        </Box>

                    </Grid>
                       <ShareBoxx url = {props.url}/>

            </Grid>
            </Container>
        </div>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    paper: {
        justify: 'center',
        padding: theme.spacing(2),
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 0,
    },

    fixedHeight: {
        height: 350,
    },
}));


export default Feed;
