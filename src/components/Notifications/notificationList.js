import React from 'react';
import InviteToChannelNotification from "./notificationTypes/inviteToChannelNotification";
import Message from "../Messages/message";

function NotificationList(props) {
    console.log('NOTIFICATIONS', props.notifications);
    return (
        <div>
            {Object.keys(props.notifications)
                .map(item =>

                    < InviteToChannelNotification
                    notification = {props.notifications[item]}
                    user = {props.user}
                />
                )
            }

        </div>
    );
}

export default NotificationList;
