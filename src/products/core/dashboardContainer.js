import React, {useEffect} from 'react';
import {db} from "../../api/firebase";
import firebase from 'firebase/app';
import {mergeAutomationIDsandMessages} from "../../helpers/filters";
import Dashboard from "./dashboard";


function DashboardContainer(props) {
    const classes = useStyles();
    const [messages, setMessages] = React.useState([]);
    const [notifications, setNotifications] = React.useState([]);
    const [automations, setAutomations] = React.useState([]);
    const [url, setURL] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [user, setUser] = React.useState(null);

    const getUser = async(email) => {
        await db.collection("users").doc(email)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                //Fixes bug where doc.data() is undefined on first signin
                let user = doc.data()
                if (user) {
                    setURL(user.url);
                    setUser(user);
                    getAutomations(user);
                }
            });
    };

    const getMessages = async(trackers) => {
        let resRef = db.collection("messages");
        let messages = [];
        if (trackers.length > 0) {
            await resRef.where("automationID", "==", trackers[0].id).get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        messages.push(doc.data())
                    });
                    let merged_messages = [];
                    for (let i = 0; i < messages.length; i++) {
                        if (trackers[0].call) {
                            let res = mergeAutomationIDsandMessages(messages[i].responseData, trackers[0].call);
                            let objres = {'merged_responses': res, 'user': messages[i].senderID};
                            merged_messages.push(objres)
                        }
                    }
                    setMessages(merged_messages);
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
            // console.log(merged_responses, messages, trackers[0].call);
        }
    };

    const getAutomations= async(user) => {
        if (user) {
            let userAutomations = user.trackers;
            let automatonRef = db.collection("trackers");
            let automations = [];
            await automatonRef.where('id', 'in', userAutomations).get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        automations.push(doc.data())
                    });
                    setAutomations(automations);
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        }
    };


    useEffect(() => {
        let email = firebase.auth().currentUser.email;
        setEmail(email);
        getUser(email);
    }, []);

    return (
            <Dashboard url = {url} user = {user} email = {email} automations = {automations} messages = {messages} />
    );
}

export default DashboardContainer;
