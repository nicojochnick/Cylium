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
import Responder from "../Responder/responder";


function MessagesContainer(props) {
    const classes = useStyles();
    let backgroundColor = '#6458FB';
    const [messages, setMessages] = React.useState([]);
    const [height, setHeight] = React.useState(300);
    const [automations, setAutomations] = React.useState([]);

    // const filterMessages = (messages) => {
    //
    //     console.log(messages)
    //
    //     let res = messages.filter(item => item.channelID === props.channels[item].channelID)
    //
    //     console.log('MESSAGES --->', res);
    //     setMessages(res)
    //
    // };

    useEffect(() => {
        console.log('messages ------> ', props.messages)
    }, []);

    //TODO: move responder up a level, don't want it grouped with messages

    return (
        <div className={classes.root}>
            <Grid style = {{}} container direction ='column'>
                <Box
                    border = {0}
                    display = 'flex'
                    flexDirection = 'column'
                    justifyContent={'flex-start '}
                    // alignItems = 'flex-end'
                    color = {'#A3A0B1'}
                    className={classes.box}
                    boxShadow = {0}
                    style ={{backgroundColor:'white', padding: 0,maxHeight: '65vh'}}
                >
                    {Object.keys(props.messages)
                        .map((item) =>
                            <Message
                                senderID = {props.messages[item].senderID}
                                automations={props.automations}
                                message={props.messages[item]}
                            />
                            )}
                </Box>
                <Box
                    border = {0}
                    color = {'#A3A0B1'}
                    style = {{minHeight: '19vh', backgroundColor: 'white'}}
                >
                    <Responder channel = {props.channel} user = {props.user}/>
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
