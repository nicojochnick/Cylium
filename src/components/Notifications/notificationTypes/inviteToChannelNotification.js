import React from 'react';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {addUserToChannel, deleteNotification} from "../../../api/firestore";
import {BiMailSend} from "react-icons/bi";

function InviteToChannelNotification(props) {

    const acceptInvite = async () => {
        //add function
        let channelIDs = props.user.channelIDs
        channelIDs.push(props.notification.channelID)
        console.log('NEW CHANNEL ARRAY', channelIDs);
        if (channelIDs.length) {
            try {
                await addUserToChannel(channelIDs, props.notification.recipientID)
            } catch {
                console.log('error')
            }
        }
        try {
            deleteNotification(props.notification.notificationID)
        } catch {
            console.log('error')
        }
    };

    const declineInvite = () => {
        //delete function
        try {
            deleteNotification(props.notification.notificationID)
        } catch {
            console.log('error')
        }
    };

    return (
        <Grid style = {{width: '100%'}} container justify='center' alignItems = 'center' direction = 'column'>
            <Grid style = {{width: '100%', margin: 10}}  sx ={12} md = {12} lg={12} direction = "row" justify='center' alignItems = 'flex-start'>
                <BiMailSend color = 'primary' size ={29} />
                <p style = {{ margin: 5,marginBottom: 10}} > {props.notification.senderID} invited you to join their channel: {props.notification.channelName}. </p>
                <Button variant={'contained'} color = 'primary' onClick = {acceptInvite}>
                    Accept
                </Button>
                <Button onClick = {declineInvite}>
                    Decline
                </Button>
                <Divider style = {{marginTop: 10}} />
            </Grid>
        </Grid>
    );
}

export default InviteToChannelNotification;
