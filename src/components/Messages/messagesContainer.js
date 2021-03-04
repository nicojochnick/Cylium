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
import StructuredMessageItem from "./structuredMessageItem"
import Message from "./message"
import {db} from "../../api/firebase";


function MessagesContainer(props) {
    const classes = useStyles();
    let backgroundColor = '#6458FB';
    const [messages, setMessages] = React.useState([]);
    const [height, setHeight] = React.useState(300);
    const [automations, setAutomations] = React.useState([]);

    //
    // const getMessages = async(trackers) => {
    //     let resRef = db.collection("messages");
    //     let messages = [];
    //     if (trackers.length > 0) {
    //         await resRef.where("automationID", "==", trackers[0].id).get()
    //             .then(function (querySnapshot) {
    //                 querySnapshot.forEach(function (doc) {
    //                     messages.push(doc.data())
    //                 });
    //                 let merged_messages = [];
    //                 for (let i = 0; i < messages.length; i++) {
    //                     if (trackers[0].call) {
    //                         let res = mergeArrayObjects(messages[i].responseData, trackers[0].call);
    //                         let objres = {'merged_responses': res, 'user': messages[i].senderID};
    //                         merged_messages.push(objres)
    //                     }
    //                 }
    //                 setMessages(merged_messages);
    //             })
    //             .catch(function (error) {
    //                 console.log("Error getting documents: ", error);
    //             });
    //         // console.log(merged_responses, messages, trackers[0].call);
    //     }
    // };
    //
    // const getAutomations = async() => {
    //     if (props.user) {
    //         let userAutomationIDs = props.user.trackers;
    //         let autoRef = db.collection("trackers");
    //         let automations = [];
    //         await autoRef.where('id', 'in', userAutomationIDs).get()
    //             .then(function (querySnapshot) {
    //                 querySnapshot.forEach(function (doc) {
    //                     automations.push(doc.data())
    //                 });
    //                 console.log(automations);
    //                 setAutomations(automations);
    //                 getMessages(automations)
    //             })
    //             .catch(function (error) {
    //                 console.log("Error getting documents: ", error);
    //             });
    //     }
    // };

    useEffect(() => {
        // getAutomations();
        console.log('message loaded: ', props.messages, props.automations, props.user)
    }, []);

    return (
        <div className={classes.root}>
            <Grid container>
                <Box className={classes.box}
                     boxShadow = {0}
                     style ={{padding: 0, margin: 10, boxShadow: "0px 5px 10px #D7D7DA",backgroundColor:'white' , }}
                     borderRadius={20}>
                        <Grid >
                            {Object.keys(props.messages).map((item) =>
                                <Message
                                    senderID = {props.messages[item].senderID}
                                    automations={props.automations}
                                    message={props.messages[item]}/>)}
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
