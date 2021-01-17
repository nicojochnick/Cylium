import React from 'react';
import Box from "@material-ui/core/Box";
import {BiHappy} from 'react-icons/bi'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import {BiPencil,BiUser, BiCog,BiBarChartAlt2} from "react-icons/bi"



function TrackerTitleTag(props) {
    return (
        <Box borderBottom = {1} borderColor= {"white"} display="flex" justifyContent = 'space-between' alignItems = 'center' flexDirection="row" borderRadius = {0} borderBottom = {0} style = {{backgroundColor: props.backgroundColor, padding: 10, height: 60, width: '100%'}}>
            <Grid container direction={'row'}>
            <BiHappy size = {25} style = {{color: "white"}} />
            <p style = {{color: '#FAFAFA', margin: 5}}> {props.trackerTitle} </p>
            </Grid>
            <Grid justify = "flex-end" container direction = "row">
                <Box style ={{marginRight: 10}} border = {1} borderColor = "white" borderRadius = {100}>
                    <IconButton color = "white" onClick={()=>props.switchCreating()}>
                        <BiUser style = {{color: "white"}} size = {20} />
                    </IconButton>
                </Box>

                <Box style ={{marginRight: 10}} border = {1} borderColor = "white" borderRadius = {100}>
                    <IconButton color = "white" onClick={()=>props.switchData()}>
                        <BiBarChartAlt2 style = {{color: "white"}} size = {20} />
                    </IconButton>
                </Box>

                <Box border = {1} borderColor = "white" borderRadius = {100}>
                <IconButton color = "white" onClick={()=>props.switchPosting()}>
                    <BiPencil style = {{color: "white"}} size = {20} />
                </IconButton>
                </Box>

            </Grid>

            {/*<Button style = {{margin: 10, paddingBottom: 0, paddingTop: 0,}} onClick={()=>props.switchPosting()} variant="contained" color="primary">*/}
            {/*    {(!props.isPosting) ? <p> Create Post </p> : <p> Delete Post </p>}*/}
            {/*</Button>*/}
        </Box>
    );
}

export default TrackerTitleTag;
