import React from 'react';
import Box from "@material-ui/core/Box";
import Rooms from "../Rooms/rooms";
import MessagesContainer from "../Chat/messagesContainer";
import Channels from "../Channels/channels"

function ChatBase(props) {
    return (
        <Box display={'flex'} flexDirection={'column'} border = {1} borderColor={'grey'} style = {{overflow:'hidden',width: props.chatWidth, height:'100vh', minWidth: 350, backgroundColor:props.user.theme === 'light' ? 'white' : '#363638', }}>
            <Channels user = {props.user}/>
            <MessagesContainer room = {props.channel.rooms[0]} automation = {props.automation} messages={props.messages.filter(item => item.roomID === props.channel.rooms[0].id)} channel = {props.channel}  user = {props.user}/>

        </Box>
    );
}

export default ChatBase;