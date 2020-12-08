import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { RiCoinsLine } from "react-icons/ri";



function Notification(props) {
    return (
        <Grid container justify='center' alignItems = 'center' direction = 'column'>
            <Grid style = {{margin: 20}} item direction = "row" justify='center' alignItems = 'flex-start'>
                <RiCoinsLine size = {25} style = {{ color:'#4D6DF1'}}  color = {'#4D6DF1'} />
                <p> {props.item.sender} just sent you {props.item.amount} points for your feedback - [{props.item.subject}] </p>
            </Grid>
            <Divider style = {{color: 'grey'}} />
        </Grid>
    );
}

export default Notification;
