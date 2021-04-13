import {db} from "./firebase";

//TODO Schematize this

//USER
export async function addUserToChannel(userChannels, userID) {
    db.collection('users').doc(userID).update({
        channelIDs: userChannels
    }).then(() => {
        console.log("channel successfully added to user" );
    }).catch((error) => {
        console.error("Error adding user to channel", error);
    });
}
export async function saveViewPort(projectIDs, userID){
    console.log('SAVING VIEWPORT');

    db.collection('users').doc(userID).update({
        projectIDs: projectIDs,

    }).then(() => {
        console.log("viewport and zoom successfully updated" );
    }).catch((error) => {
        console.error("Error adding user to channel", error);
    });
}


const sendFriendRequest = async(senderEmail,viewerEmail, senderName, senderImg, viewerImg ) => {
    //Add both people to each other friend lists as "pending".
    let addedUserRef = await db.collection('users').doc(senderEmail);
    let addedUserGet = await addedUserRef.get();
    let addedUserData = addedUserGet.data();

    let viewingUserRef =  await db.collection('users').doc(viewerEmail);
    let viewingUserGet =  await viewingUserRef.get();
    let viewingUserData = viewingUserGet.data();

    let addedList = addedUserData.friendList;
    addedList.push(
        {
            name: viewerEmail,
            email: senderEmail,
            img_url_Profile: {imgUrl: senderImg},
            pending: true,
            timeStamp: new Date(),
        }
    );

    let viewingList = viewingUserData.friendList;
    viewingList.push(
        {
            name: senderName,
            email: viewerEmail,
            img_url_Profile: {imgUrl: viewerImg},
            pending: true,
            timeStamp: new Date(),
        }
    );
    const resAdded = await addedUserRef.update({friendList: addedList});
    const viewingAdded = await viewingUserRef.update({friendList: viewingList});
};


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
    console.log('adding mess');
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

//Projects
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
}

export async function editProjectName(name, channelID) {
    db.collection('channels').doc(channelID).update({
        name: name
    }).then(() => {
        console.log("project name successfully updated" );
    }).catch((error) => {
        console.error("Error adding user to channel", error);
    });
}

export async function updateProjectColor(color, channelID) {
    db.collection('channels').doc(channelID).update({
        color: color
    }).then(() => {
        console.log("project color successfully updated" );
    }).catch((error) => {
        console.error("Error adding user to channel", error);
    });
}

export async function editProjectIMG(img,channelID) {
    console.log('saving IMG to:', channelID)
    db.collection('channels').doc(channelID).update({
        img: img
    }).then(() => {
        console.log("channel successfully added to user" );
    }).catch((error) => {
        console.error("Error adding user to channel", error);
    });
}

export async function addChannel (userID, channels){
    const res = await db.collection('channels').add({
        flow: '',
        name: null,
        color: '#4783FB'
    });
    console.log(res, userID,channels);
    db.collection('channels').doc(res.id).update({
        channelID: res.id
    }).then(() => {
        console.log(" Channel Invite Notification and ID successfully created");
    }).catch((error) => {
        console.error("Error creating notification and/or ID ", error);
    });
    let c = channels;
    c.push(res.id);
    const userRes = await db.collection('users').doc(userID).update({
        channelIDs:c
    })
}


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

export async function deleteNotification(notificationID){
    console.log('deleting notification: ', notificationID);
    const res = await db.collection('notifications').doc(notificationID).delete()

}








