import React from 'react';
import Box from "@material-ui/core/Box";
import Rooms from "../Rooms/rooms";
import MessagesContainer from "../Chat/messagesContainer";
import Channels from "../Channels/channels"

function ChatBase(props) {
    const [channels, setChannel] = React.useState(props.channel.rooms);
    const [currentChannel, setCurrentChannel] = React.useState(props.channel.rooms[0])

    const selectChannel = (channel) => {
        setCurrentChannel(channel)
        console.log(channel)
    }

    return (
        <Box display={'flex'} flexDirection={'column'} border={1} style = {{overflow:'hidden',width: props.chatWidth, height:'100vh', minWidth: 400, backgroundColor:props.user.theme === 'light' ? 'white' : '#363638', }}>
            <Channels selectChannel = {selectChannel} channels = {channels} user = {props.user}/>
            <MessagesContainer room = {currentChannel} automation = {props.automation} messages={props.messages.filter(item => item.roomID === currentChannel.id)} channel = {props.channel}  user = {props.user}/>
        </Box>
    );
}

export default ChatBase;