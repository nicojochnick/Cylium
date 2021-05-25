import React from 'react';
import Box from "@material-ui/core/Box";
import Rooms from "../Rooms/rooms";
import MessagesContainer from "../Chat/messagesContainer";
import Channels from "../Channels/channels"

function ChatBase(props) {
    const [channels, setChannel] = React.useState(props.channel.rooms);

    const selectChannel = (channelID) => {


    }
    return (
        <Box display={'flex'} flexDirection={'column'} border={1} style = {{overflow:'hidden',width: props.chatWidth, height:'100vh', minWidth: 400, backgroundColor:props.user.theme === 'light' ? 'white' : '#363638', }}>
            <Channels channels = {channels} user = {props.user}/>
            <MessagesContainer room = {channels[0]} automation = {props.automation} messages={props.messages.filter(item => item.roomID === props.channel.rooms[0].id)} channel = {props.channel}  user = {props.user}/>
        </Box>
    );
}

export default ChatBase;