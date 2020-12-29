import React from 'react';
import Box from "@material-ui/core/Box";
import {BiHappy} from 'react-icons/bi'


function TrackerTitleTag(props) {
    return (
        <Box display="flex" alignItems = "center" flexDirection="row" borderRadius = {0} borderBottom = {0} style = {{backgroundColor: props.backgroundColor, padding: 10, height: 35, width: '100%'}}>
            <BiHappy size = {25} style = {{color: "white"}} />
            <p style = {{color: '#FAFAFA', margin: 5}}> {props.trackerTitle} </p>
        </Box>
    );
}

export default TrackerTitleTag;
