import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MessagesContainer from "../Chat/messagesContainer";
import {BiPlus} from "react-icons/bi";
import IconButton from "@material-ui/core/IconButton";
import {addRoomDB} from "../../../api/firestore";


export default function Rooms(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addRoom = () => {
        let index = props.channel.rooms.length + 1;
        let newRoom = {name: 'untitled', id: Math.random().toString(), index: index};
        let updatedRooms = props.channel.rooms.slice();
        updatedRooms.push(newRoom);
        addRoomDB(props.channel.channelID, updatedRooms)
    };

    return (
        <div className={classes.root}>
            <Box display = 'flex' justifyContent = 'flex-end' alignItems = 'flex-start' borderRadius = {100} style = {{backgroundColor: 'white',}}>

                <Box borderRadius = {100} style = {{ boxShadow: '0px 1px 4px 0.1px #616161', backgroundColor: 'white', padding: 0, marginRight: -15, marginTop: 6, position: 'absolute', zIndex: 20}}>

                <IconButton style = {{margin: 0,padding: 5, }} onClick = {addRoom}>
                 <BiPlus/>
                </IconButton>
                </Box>
            </Box>
            <AppBar style = {{backgroundColor:props.channel.color,}} position="static">
                <Tabs variant={'fullWidth'} indicatorColor={'secondary'} value={value} onChange={handleChange}>
                    {props.channel.rooms.map((room)=>{
                        return <Tab label = {room.name} />
                    })
                    }
                </Tabs>
            </AppBar>
            {props.channel.rooms.map((room)=>{
                    return <TabPanel room = {room}  messages = {props.messages} value = {value} user = {props.user} channel = {props.channel} index = {room.index} />
            }
            )
            }
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index
                ? <MessagesContainer room = {props.room} automation = {props.automation} messages={props.messages.filter(item => item.roomID === props.room.id)} channel = {props.channel}  user = {props.user} />
                : null
            }
        </div>
    );
}



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop:10,
        boxShadow: '0px 3px 5px #D3D3DA',
    },
}));
