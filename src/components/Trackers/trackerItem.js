import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField/TextField";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {BiHappy} from 'react-icons/bi'
import TrackerTitleTag from "./trackerTitleTag";
import Pulse from "../../assets/images/pulse.gif";
import UserId from "../User/userID";
import ShareBoxx from "../Old/Share/shareBoxx";
import TrackerLytics from "./trackerLytics";
import TrackerResponseList from "./trackerResponseList";
import {db} from "../../api/firebase";


function TrackerItem(props) {
    const classes = useStyles();
    let backgroundColor = '#6458FB';
    let trackerTitle = 'Engagement';
    const [responses, setResponses] = React.useState([]);

    const getResponses = async() => {
        let resRef = db.collection("responses");
        let responses = [];
        resRef.where('team', '==', props.user.team.toString()).where("trackerID", "==", props.tracker.id.toString()).get()
            . then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    responses.push(doc.data())
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        setResponses(responses)
    };

    useEffect(() => {
        getResponses()
    }, []);

    return (
        <Box className={classes.box}
             boxShadow = {0}
             style ={{padding: 0, boxShadow: "0px 5px 10px #D7D7DA"}}
             borderRadius={20}>
            <TrackerTitleTag backgroundColor = {backgroundColor} trackerTitle = {props.tracker.trackerName} />
            <Grid style = {{minHeight: 300}} container spacing={0} xs={12}>
                <Grid style = {{backgroundColor:'#2F2C37', minHeight: 300}} item xs={12} md={5} lg={5}>
                    <TrackerLytics responses = {responses} />
                </Grid>
                <Grid item xs={12} md={7} lg={7}>
                    <TrackerResponseList responses = {responses} />
                </Grid>
            </Grid>
        </Box>
    );
};




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
    },

    boxSticky:{
        padding: 0,
        top: "5rem",
        position: "sticky",
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        minHeight: 300,
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


export default TrackerItem;
