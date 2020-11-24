import React, {useEffect} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

import firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from "../api/firebase";
import {auth} from "../api/firebase";

function Url(props) {
    const classes = useStyles();
    const [url, setURL] = React.useState();
    useEffect(() => {
        let email = firebase.auth().currentUser.email;
        console.log(email);
        db.collection("users").doc(email)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                setURL(doc.data().url)
            });
    }, []);

    const updateURL = () => {
        db.collection("users").doc("nico.jochnick@gmail.com")
            .set({url: Date.now()})
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    };
    return (
        <Grid spacing = {3} item xs={12}>
            <Paper className={classes.paper}>
                Your Unique ID: https://feedboxx.io/{url}
                <Button  onClick={updateURL} variant="contained" color="primary"> update my url</Button>
            </Paper>
        </Grid>
    );
}
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
    },
}));

export default Url;
