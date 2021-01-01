import React from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import mscott from "../../assets/images/mscott.png";
import Grid from "@material-ui/core/Grid";
import TrackerResponseItem from "./trackerResponseItem";
import TrackerItem from "../Trackers/trackerItem";

function TrackerResponse(props) {
    const classes = useStyles();
    return (
        <div>
            <Box className={classes.box}
                 boxShadow = {0}
                 // border = {2}
                 // borderColor = {'#8B8FA0'}
                 style ={{padding: 20, marginBottom: 15, minHeight: 100, boxShadow: "0px 5px 13px -8px #585858"}}
                 borderRadius={2}>
                <Grid justify='flex-start' alignItems='flex-start' direction = "row" container style = {{margin: 0,}}>
                    <Grid item xs={1.5} md={1.5} lg={1.5}>
                    <Box style = {{margin: 5}} border = {2} borderColor = {'#4D6DF1'} borderRadius = {50}>
                        <Avatar src = {mscott} className={classes.large}/>
                    </Box>
                    </Grid>
                    <Grid item xs={10} md={10} lg={10}>
                        <p style = {{margin: 8, marginTop:2, marginBottom: 0, fontSize: 15, color: '#8B8FA0', fontWeight: 500,}}>Amy Windsor</p>
                        {Object.keys(props.response).map((item) => <TrackerResponseItem  response={props.response[item]} />)}
                        <p style={{color: '#8B8FA0', fontSize: 12, margin: 8, marginTop: 2,}}>Monday, May 2020 </p>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box:{
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'white',
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    paper: {
        justify: 'center',
        padding: theme.spacing(2),
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 0,
    },

    fixedHeight: {
        height: 350,
    },
}));

export default TrackerResponse;
