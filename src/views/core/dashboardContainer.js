import React, {useEffect} from 'react';
import {db} from "../../api/firebase";
import firebase from 'firebase/app';
import {mergeAutomationSchemaandMessages} from "../../helpers/filters";
import Dashboard from "./dashboard";
import {fade, makeStyles} from "@material-ui/core";


function DashboardContainer(props) {
    const classes = useStyles();
    const [messages, setMessages] = React.useState([]);
    const [notifications, setNotifications] = React.useState([]);
    const [automations, setAutomations] = React.useState([]);
    const [url, setURL] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [channels, setChannels] = React.useState([]);
    const [userAutomations, setUserAutomations] = React.useState([]);
    const [allchannels,setAllChannels] = React.useState([]);

    const getAllChannels = () =>{
        let filtered =  allchannels.filter(function(item) { return item.name !== null});
        console.log('all channels filtered')
        return filtered

    };

    const getUser = async(email) => {
        await db.collection("users").doc(email)
            .onSnapshot(function(doc) {
                console.log("user pulled: ", doc.data());
                //Fixes bug where doc.data() is undefined on first signin
                let user = doc.data();
                if (user) {
                    setURL(user.url);
                    setUser(user);
                }
            })
    };


    useEffect(() => {
        let currentUser = firebase.auth().currentUser;
        let user = null;
        console.log(user)
        const email = currentUser.email;
        setEmail(email);
        function getUser(doc) {
            console.log("user pulled: ", doc.data());
            //Fixes bug where doc.data() is undefined on first signin
            let userPulled = doc.data();
            if (userPulled) {
                user = userPulled;
                setURL(userPulled.url);
                setUser(userPulled);
            }
        }

        const queryUser = db.collection('users').doc(email);
        const unsubscribeUser =  queryUser.onSnapshot(getUser, error => console.log(error));
        return () => {
            unsubscribeUser();
        }

    }, []);



    useEffect(async () => {

        const projectRef = db.collection('channels');
        // const snapshot = await projectRef.get();
        const snap =  projectRef.onSnapshot(querySnapshot => {
            let channels = [];
            querySnapshot.forEach(doc => {
                channels.push(doc.data());
            });
            setAllChannels(channels)
            // ...
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    }, []);



    useEffect(() => {
        function getChannels(querySnapshot) {
            let channels = [];
            let automationIDs = [];
            querySnapshot.forEach(function (doc) {
                let c = doc.data();
                console.log(c.automationIDs);
                channels.push(c);
                automationIDs = automationIDs.concat(c.automationIDs)
            });
            console.log('successful channel pull: ', channels);
            setChannels(channels);
            console.log('AUTOMATION IDS', automationIDs)
            setUserAutomations(automationIDs);
        }
        if (user && Object.keys(user.projectIDs).length > 0) {
            console.log('user is present');
            let projectIDs = user.projectIDs;

            const queryChannels = db.collection('channels').where('channelID', 'in', Object.keys(projectIDs));
            const unsubscribeChannels = queryChannels.onSnapshot(getChannels, error => console.log(error));

            return () => {
                unsubscribeChannels()
            }
        }
    }, [user]);

    useEffect(() => {
        //TODO: we want to pull only messages that are relevant. The most recent 10 from any tracker in the userTrackerList.
        function getMessages(querySnapshot) {
            let messages= [];
            querySnapshot.forEach(function (doc) {
                messages.push(doc.data())
            });
            console.log('successfully pulled messages: ', messages);
            let message_sorted = messages.sort( function(a,b) {return a.timeStamp - b.timeStamp});
            setMessages(message_sorted)
        }
        if (user && Object.keys(user.projectIDs).length > 0 ) {
            let projectIDs = user.projectIDs;
            console.log('user is present, pulling messages');
            const queryMessages = db.collection('messages').where('channelID', 'in', Object.keys(projectIDs));
            const unsubscribeMessages = queryMessages.onSnapshot(getMessages, error => console.log(error));
            return () => {
                unsubscribeMessages()
            }
        }
    }, [user]);

    useEffect(() => {
        function getNotifications(querySnapshot) {
            let notifications= [];
            querySnapshot.forEach(function (doc) {
                notifications.push(doc.data())
            });
            console.log('successfully pulled notifications ', notifications);
            let notifications_sorted =  notifications.sort( function(a,b) {return a.timeStamp - b.timeStamp});
            setNotifications(notifications_sorted)
        }
        if (user) {
            console.log('user is present, pulling notifications');
            const queryNotifications= db.collection('notifications').where('recipientID', '==', user.email);
            const unsubscribeNotifications = queryNotifications.onSnapshot(getNotifications, error => console.log(error));
            return () => {
                unsubscribeNotifications()
            }
        }
    }, [user]);


    return (
        <Dashboard notifications = {notifications} allChannels = {getAllChannels()} channels = {channels} url = {url} user = {user} email = {email} automations = {automations} messages = {messages} />
    );
}

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#F8F8F8',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        backgroundColor: '#F8F8F8',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
    },
    fixedHeight: {
        height: 240,
    },
    search: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: fade("#A8ADBC", 0.15),
        '&:hover': {
            backgroundColor: fade("#A8ADBC", 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

}));


export default DashboardContainer;


// Probably not necessary

// let merged_messages = [];
// if (messages.length > 0) {
//     for (let i = 0; i < messages.length; i++) {
//         if (autos[0].call) {
//             let res = mergeAutomationSchemaandMessages(messages[i].messageData, autos[0].call);
//             let objres = {'merged_packageItems': res, 'user': messages[i].senderID};
//             merged_messages.push(objres)
//         }
//     }
// }
// console.log('merged messages:  ' + merged_messages);




// const getUser = async(email) => {
//     await db.collection("users").doc(email)
//         .onSnapshot(function(doc) {
//             console.log("user pulled: ", doc.data());
//             //Fixes bug where doc.data() is undefined on first signin
//             let user = doc.data();
//             if (user) {
//                 setURL(user.url);
//                 setUser(user);
//             }
//         })
// };
//
// const getAutomations = async() => {
//     if (user) {
//         let userAutomations = user.trackers;
//         let automatonRef = db.collection("trackers");
//         let automations = [];
//         await automatonRef.where('id', 'in', userAutomations).get()
//             .then(function (querySnapshot) {
//                 querySnapshot.forEach(function (doc) {
//                     automations.push(doc.data())
//                 });
//                 setAutomations(automations);
//                 console.log('refreshed')
//             })
//             .then(() => {
//                 console.log("Automations successfully pulled");
//             })
//             .catch(function (error) {
//                 console.log("Error getting documents: ", error);
//             });
//     }
// };
//
//
// const getMessages = async() => {
//     let autos = automations
//     console.log(autos);
//     let resRef = db.collection("messages");
//     let messages = [];
//     if (autos.length > 0) {
//         await resRef.where("automationID", "==", autos[0].id).get()
//             .then(function (querySnapshot) {
//                 querySnapshot.forEach(function (doc) {
//                     messages.push(doc.data())
//                 });
//
//                 setMessages(messages);
//             })
//             .then(() => {
//                 console.log("Messages successfully pulled");
//             })
//             .catch(function (error) {
//                 console.log("Error getting documents: ", error);
//             });
//         // console.log(merged_responses, messages, autos[0].call);
//     }
// };



// useEffect(() => {
//     //TODO: We only want to pull trackers that are in the usertracker owner list (make a new list or double filter)
//     function getAutomations(querySnapshot) {
//         let automations = [];
//         querySnapshot.forEach(function (doc) {
//             automations.push(doc.data())
//         });
//         console.log('successfuly setted automation: ', automations)
//         setAutomations(automations)
//     }
//     if (userAutomations.length > 0) {
//         console.log('automationIDs pulled and getting Automations');
//         const queryAutomations = db.collection('trackers').where('id', 'in', userAutomations);
//         const unsubscribeAutomations = queryAutomations.onSnapshot(getAutomations, error => console.log(error));
//         return () => {
//             unsubscribeAutomations()
//         }
//     }
// }, [userAutomations]);
