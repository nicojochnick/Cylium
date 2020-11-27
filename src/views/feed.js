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


function Feed(props) {
    const classes = useStyles();
    const [feed, setFeed] = React.useState([]);
    const [url, setURL] = React.useState(null);
    useEffect(() => {
        let email = firebase.auth().currentUser.email;
        db.collection("feedback").where('url', '==', props.url.toString())
            .onSnapshot(function (querySnapshot) {
                let feedback = [];
                querySnapshot.forEach(function (doc) {
                    feedback.push(doc.data());
                });
                setFeed(feedback);
            });
    }, []);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Box className={classes.box} boxShadow = {4}>
                                <h2
                                    style ={{
                                        margin: 15,
                                        color:"#9FA5B1",
                                        fontSize: 15,
                                        fontWeight: 600
                                    }}>
                                    FEEDBACK
                                </h2>
                            <Divider style ={{marginTop:30}}/>

                            {feed.map((item) =>
                                    <Feedback item = {item}/>
                                    )}

                        </Box>

                    </Grid>
                    <RewardTracker isSubscribed = {props.isSubscribed} />

                </Grid>
                <Box pt={4}>
                </Box>
            </Container>
        </div>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
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
