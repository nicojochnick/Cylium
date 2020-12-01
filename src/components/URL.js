import React, {useEffect} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

import firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from "../api/firebase";
import {auth} from "../api/firebase";
import Box from "@material-ui/core/Box";

function Url(props) {
    const classes = useStyles();
    const [url, setURL] = React.useState();
    return (
        <div>
            {(!props.noShare)
               ? <h2
                    style={{
                        color: "#9FA5B1",
                        fontSize: 15,
                        fontWeight: 600,
                        margin: 10,
                    }}>
                    SHARE
                </h2>
                :null
            }
            <Box
                style = {{backgroundColor:"#E1E4ED", margin: 5, borderRadius: 10, padding: 3}}
                className={classes.container}>
                <p style = {{color: "#202740", fontSize: 13, margin: 8, fontWeight: 400}}>
                    https://feedbox.io/{props.url}
                </p>
            </Box>
        </div>
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
    container:{
        margin: 20

    },
}));

// useEffect(() => {
//     let email = firebase.auth().currentUser.email;
//     console.log(email);
//     db.collection("users").doc(email)
//         .onSnapshot(function(doc) {
//             console.log("Current data: ", doc.data());
//             setURL(doc.data().url)
//         });
// }, []);

// const updateURL = () => {
//     db.collection("users").doc("nico.jochnick@gmail.com")
//         .set({url: Date.now()})
//         .then(function() {
//             console.log("Document successfully written!");
//         })
//         .catch(function(error) {
//             console.error("Error writing document: ", error);
//         });
// };

export default Url;
