import React from 'react';
import Grid from "@material-ui/core/Grid";
import AutomationList from "../components/Automation/automationList";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

function AutomationView(props) {

    const classes = useStyles();
    const [switchState, setSwitch] = React.useState(false);
    const [stretch, setStretch] = React.useState(12);


    return (
        <div className={classes.root} >
            <Container className={classes.container}>
                <Grid container spacing={1}>
                    <Grid container
                          direction='row'
                          justify= 'center'
                          alignItems = 'center' >
                    </Grid>
                    <Grid xs = {12}  md = {stretch} lg = {stretch} container>
                        <AutomationList setStretch = {setStretch} isMe = {true}  user = {props.user} />
                        {/*<TrackerItem/>*/}
                    </Grid>
                </Grid>
            </Container>
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


}));
export default AutomationView;
