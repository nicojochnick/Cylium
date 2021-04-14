import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MessagesContainer from "../Chat/messagesContainer";



export default function Rooms(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={classes.root}>
            <AppBar style = {{backgroundColor:props.channel.color}} position="static">
                <Tabs  variant={'fullWidth'} indicatorColor={'secondary'} value={value} onChange={handleChange}>
                    {props.channel.rooms.map((room)=>{
                        return <Tab label = {room.name} />
                    })
                    }
                </Tabs>
            </AppBar>

            <MessagesContainer automation = {props.automation} messages={props.messages} channel = {props.channel}  user = {props.user} />




        </div>
    );
}



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop:10,
    },
}));
