import {db} from "./firebase";


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
