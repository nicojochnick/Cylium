import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { RiCoinsLine } from "react-icons/ri";


function Notification(props) {
    return (
        <Grid style = {{width: '100%'}} container justify='center' alignItems = 'center' direction = 'column'>
            <Grid style = {{width: '100%'}} item direction = "row" justify='center' alignItems = 'flex-start'>
                <p style = {{ margin: 20, marginTop: -16,}} >  </p>
                <Divider/>
            </Grid>
        </Grid>
    );
}

export default Notification;
