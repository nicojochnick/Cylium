import React, {useEffect} from 'react';
import {db} from "../../api/firebase";
import {makeStyles} from "@material-ui/core/styles";
import TyperTracker from "./typerTracker";
import TrackerResponseItem from "../Responses/trackerResponseItem";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";


function TyperList(props) {
    console.log(props.tracker)
    const classes = useStyles();


    useEffect(() => {


    }, []);

    return (
        <div className={classes.root}>
            <Box className={classes.box}
                 boxShadow={0}
                // border = {2}
                // borderColor = {'#8B8FA0'}
                 style={{padding: 10, marginBottom: 15, minHeight: 100, boxShadow: "0px 5px 13px -8px #585858"}}
                 borderRadius={2}>
            <Grid style = {{width: '100%'}} direction = 'column' container justify = 'center'>
            {(props.tracker.call)
                ?
                <div>
                    {Object.keys(props.tracker.call).map((item) =>
                    <TyperTracker question={props.tracker.call[item]}/>
                    )}
                </div>
                : null
            }
            <Grid container justify='center'>
            <Button style = {{width: 200, margin: 10}} variant="contained" color="primary">
                Submit
            </Button>
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

export default TyperList;
