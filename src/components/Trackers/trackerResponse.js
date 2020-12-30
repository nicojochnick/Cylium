import React from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import mscott from "../../assets/images/mscott.png";
import Grid from "@material-ui/core/Grid";


function TrackerResponse(props) {
    const classes = useStyles();

    return (
        <div>
            <Box className={classes.box}
                 boxShadow = {0}
                 style ={{padding: 20, minHeight: 100, boxShadow: "0px 5px 10px #D7D7DA"}}
                 borderRadius={20}>
                <Grid justify='flex-start' alignItems='flex-start' direction = "row" container style = {{marginLeft: 0,}}>
                    <Grid item >
                    <Box border = {2} borderColor = {'#4D6DF1'} borderRadius = {50}>
                        <Avatar  src = {mscott} className={classes.large}/>
                    </Box>
                    </Grid>
                    <Grid item xs={11} md={11} lg={11}>
                        <p style = {{margin: 8, marginTop:2, marginBottom: 0, fontSize: 15, color: '#8B8FA0', fontWeight: 500,}}>Amy Windsor</p>
                        <p style={{color: '#262139', fontSize: 15, margin: 8, marginTop: 2,}}>Loerum Ipsum posum titsums hopesome. Jokesome lopesome ipsome, tomesome. </p>
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
        margin: 10,
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
