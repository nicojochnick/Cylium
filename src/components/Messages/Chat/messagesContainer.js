import React, {useEffect, useRef} from 'react';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField/TextField";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import EditableUserID from "../../Profile/User/editableUserID";
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import StructuredMessageItem from "./structuredMessageItem"
import Message from "./message"
import {db} from "../../../api/firebase";
import Responder from "../Responder/responder";

function MessagesContainer(props) {
    const classes = useStyles();
    let backgroundColor = '#6458FB';
    const [messages, setMessages] = React.useState([]);
    const [height, setHeight] = React.useState(300);
    const [automations, setAutomations] = React.useState([]);

    const messagesEndRef = useRef(null);
    //TODO: TRIGGGER SCROLL TO BOTTOM ONCE ALL MESSAGES ARE LOADED, and when new messaged are added, INSTEAD OF AN ARBITRARY TIME
    const scrollToBottom = (type) => {
        setTimeout(() => {
            if (type === 'set') {
                messagesEndRef.current?.scrollIntoView({ behavior: 'auto',block: 'end', inline: 'end'  });

            } else {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth',block: 'end', inline: 'end'  });
            }
        }, 500);
    };

    const sortAndSetMessages = (messages ) => {
        // let sorted = messages.sort( function(a,b) {return new Date(b.data) - new Date(a.date)});
        // console.log('SORTED MESSAGES,', sorted);
        // setMessages(sorted);
    };

    useEffect(() => {
        // sortAndSetMessages(props.messages);
        scrollToBottom('set');

    }, []);

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    //TODO: move responder up a level, don't want it grouped with messages
    return (
            <Box display = 'flex'  justifyContent={'space-between'} flexDirection ='column'>
                <Divider style={{backgroundColor:'black'}}/>
                <Box
                    border = {0}
                    // display = 'flex'
                    flexDirection = 'column'
                    justifyContent={'flex-end '}
                    alignItems = 'flex-end'
                    color = {'#A3A0B1'}
                    className={classes.box}
                    boxShadow = {0}
                    style ={{ marginRight: 0, padding: 10, minWidth: 400,height: '75vh',overflowY: 'scroll'}}
                >
                        {Object.keys(props.messages)
                        .map((item) =>
                            <Message
                                key = {props.messages[item].messageID}
                                senderID = {props.messages[item].senderID}
                                automations={props.automations}
                                message={props.messages[item]}
                            />
                            )
                    }
                        <div ref={messagesEndRef}></div>
                </Box>
                <Divider style={{backgroundColor:'black'}}/>
                <Box
                    display = 'flex'
                    justifyContent = 'flex-end'
                    flexDirection = 'column'
                    borderColor = {'grey'}
                    color = {'#A3A0B1'}
                    style = {{zIndex: 0, margin: 0,}}
                >
                    <Responder scrollToBottom = {scrollToBottom} room = {props.room} channel = {props.channel} user = {props.user}/>
                </Box>
            </Box>
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
        display: 'start',
        flexDirection: 'column',
        // margin: 10,
        // marginBottom: 20,
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
