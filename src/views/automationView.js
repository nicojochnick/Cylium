import React from 'react';
import Grid from "@material-ui/core/Grid";
import AutomationList from "../components/Apps/Automation/automationList";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

function AutomationView(props) {

    const classes = useStyles();
    const [switchState, setSwitch] = React.useState(false);
    const [stretch, setStretch] = React.useState(12);


    return (
        <div className={classes.root} >
            <div className={classes.container}>
                <Grid container spacing={0}>
                    <Grid container
                          direction='row'
                          justify= 'center'
                          alignItems = 'center' >
                    </Grid>
                    <Grid style = {{backgroundColor: 'white', overflow:'hidden', height: '90vh'}} xs = {12} md={3} lg = {3} item>

                    </Grid>
                    <Grid xs = {12}  md = {9} lg = {9} item>
                        <AutomationList automations = {props.automations} setStretch = {setStretch} isMe = {true}  user = {props.user} />
                        {/*<TrackerItem/>*/}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
    },


}));
export default AutomationView;
