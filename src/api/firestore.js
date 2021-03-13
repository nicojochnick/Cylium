import {db} from "./firebase";


//TODO Schematize this

export async function sendMessageFS(automationID, adminID, messageData, recipientIDs,) {
    let res = await db.collection('messages').add({
        automationID: automationID,
        senderID: adminID,
        messageData: messageData,
        recipientIDs: recipientIDs,
        structuredMessage: true,
        timeStamp: new Date()
    }).then(() => {
        console.log("Message successfully written!");
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}

export async function sendPublicChannelMessageFS(channelID, userID, messageData,) {
    console.log('adding mess')
    let res = await db.collection('messages').add({
        channelID: channelID,
        public:true,
        senderID: userID,
        messageContent: messageData,
        structuredMessage: false,
        timeStamp: new Date()
    }).then(() => {
        console.log("Message successfully written!");
    }).catch((error) => {
        console.error("Error writing document: ", error);
    });
}

export async function saveFlow (channelID, flow) {
    console.log('saving flow for: ', channelID, ' with ', flow);
    let parsedFlow = JSON.stringify(flow)
    console.log(parsedFlow)

    const channelRef = db.collection('channels').doc(channelID);
    const res = await channelRef.update({flow: parsedFlow})
        .then(() => {
        console.log("flow successfully saved")})
        .catch((error) => {
        console.error("Error writing document: ", error);
    });

};
