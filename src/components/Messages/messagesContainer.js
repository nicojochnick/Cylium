import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField/TextField";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import EditableUserID from "../User/editableUserID";
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import MessageItem from "./messageItem"
import MessageList from "./messageList"

import {db} from "../../api/firebase";


function mergeArrayObjects (arr1,arr2){
    console.log(arr1,arr2)
    return arr1.map((item,i) => {
        if(arr2[i] && item.callID === arr2[i].callID){
            //merging two objects
            return Object.assign({},item,arr2[i])
        }
    })
};


function MessagesContainer(props) {
    const classes = useStyles();
    let backgroundColor = '#6458FB';
    const [responses, setResponses] = React.useState([]);
    const [height, setHeight] = React.useState(300);
    const [trackers, setTrackers] = React.useState([]);



    const getResponses = async(trackers) => {
        let resRef = db.collection("responses");
        let responses = [];
        console.log('TRIGGERED');

        console.log(trackers.length)

        if (trackers.length > 0) {
            await resRef.where("trackerID", "==", trackers[0].id).get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        responses.push(doc.data())
                    });

                    let merged_responses = [];
                    for (let i = 0; i < responses.length; i++) {
                        if (trackers[0].call) {
                            let res = mergeArrayObjects(responses[i].responseData, trackers[0].call);
                            let objres = {'merged_responses': res, 'user': responses[i].senderID};
                            merged_responses.push(objres)
                        }

                    }
                    setResponses(merged_responses)

                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });


            // console.log(merged_responses, responses, trackers[0].call);

        }
    };

    const getTrackers = async() => {
        if (props.user) {
            let teamTrackerIDs = props.user.trackers;
            let trackRef = db.collection("trackers");
            let teamTrackers = [];
            await trackRef.where('id', 'in', teamTrackerIDs).get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        teamTrackers.push(doc.data())
                    });
                    console.log(teamTrackers);
                    setTrackers(teamTrackers);
                    getResponses(teamTrackers)
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        }
    };

    let totalHeight = height + 100;

    useEffect(() => {
        getTrackers();
    }, []);

    return (
        <div className={classes.root}>
            <Grid container>
                <Box className={classes.box}
                     boxShadow = {0}
                     style ={{padding: 0, margin: 10, boxShadow: "0px 5px 10px #D7D7DA",backgroundColor:'#F7F7F7' , }}
                     borderRadius={20}>

                        <Grid >
                            <Divider/>
                            {Object.keys(responses).map((item) =>
                                <MessageList
                                    user = {props.user}
                                    tracker={props.tracker}
                                    response={responses[item]}/>)}
                        </Grid>

                </Box>
            </Grid>
        </div>
    );
};




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0,
        margin: 0,
    },
    box:{
        flexGrow: 1,
        padding: 0,
        margin: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        position: 'relative',
        // margin: 10,
        // marginBottom: 20,
        // backgroundColor: 'white',
    },

    inner_box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        overflowY: 'scroll',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginRight: -15
    },

    boxSticky:{
        padding: 0,
        top: "0rem",
        position: "sticky",
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        // backgroundColor: 'white',
    },
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
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
    },
}));



export default MessagesContainer;
