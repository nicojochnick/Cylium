import {db} from "./firebase";


//TODO Schematize this


//MESSAGES

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
    const res = await db.collection('messages').add({
        channelID: channelID,
        public:true,
        senderID: userID,
        messageContent: messageData,
        structuredMessage: false,
        timeStamp: new Date()
    });

    db.collection('messages').doc(res.id).update({
        messageID: res.id
    }).then(() => {
        console.log("Message ID added");
    }).catch((error) => {
        console.error("Error adding ID to message: ", error);
    });
}


export async function deleteMessage(messageID){
    console.log('deleting message: ', messageID);
    const res = await db.collection('messages').doc(messageID).delete()

}

//FLOWS

export async function saveFlow (channelID, flow) {
    console.log('saving flow for: ', channelID, ' with ', flow);
    let parsedFlow = JSON.stringify(flow);
    console.log(parsedFlow);

    const channelRef = db.collection('channels').doc(channelID);
    const res = await channelRef.update({flow: parsedFlow})
        .then(() => {
        console.log("flow successfully saved")})
        .catch((error) => {
        console.error("Error writing document: ", error);
    });

};


//NOTIFICATIONS

export async function sendFlowInvite (channelID, channelName, senderID, recipientID){

    const res = await db.collection('notifications').add({
        channelID: channelID,
        type: 'channelInvite',
        senderID: senderID,
        channelName: channelName,
        recipientID: recipientID,
        timeStamp: new Date()
    });

    db.collection('notifications').doc(res.id).update({
        notificationID: res.id
    }).then(() => {
        console.log(" Channel Invite Notification and ID successfully created");
    }).catch((error) => {
        console.error("Error creating notification and/or ID ", error);
    });


}


