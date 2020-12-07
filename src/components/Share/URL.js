import React, {useEffect} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from "../../api/firebase";
import {auth} from "../../api/firebase";
import Box from "@material-ui/core/Box";

function Url(props) {
    const classes = useStyles();
    const [url, setURL] = React.useState();

    let textSize = 10;
    if (props.big) {
        textSize = 14;

    }

    return (
        <Grid style = {{width: '100%'}} direction = "column"wrap="nowrap" >
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
                flexWrap="wrap"
                border = {1}
                borderColor = {"#4D6DF1"}
                style = {{ flexGrow: 1, backgroundColor:"white", margin: 7, borderRadius: 13, padding: 0, maxWidth: 300, minWidth: 150}}
                className={classes.container}>
                <p style = {{color: "#4D6DF1",fontSize: textSize, margin: 4, marginTop: 7, marginBottom: 7, fontWeight: 400,}}>
                    https://feedboxx.io/feedboxx/{props.url}
                </p>
            </Box>

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
    container:{
        margin: 10

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
