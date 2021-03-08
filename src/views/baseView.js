import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MessagesContainer from "../components/Messages/messagesContainer"


import {makeStyles} from "@material-ui/core/styles";
import AutomationItem from "../components/Automation/automationItem";
import AutomationList from "../components/Automation/automationList";
import BaseChart from "../components/Flow/baseChart";
function BaseView(props) {

    const classes = useStyles();
    const [switchState, setSwitch] = React.useState(false);
    const [stretch, setStretch] = React.useState(6);
    const handleSwitch = (event) => {
        setSwitch(!switchState);
    };

    return (
        <div className={classes.root} >
            <Container className={classes.container}>
                <Grid container spacing={1}>
                    <Grid container direction='row' justify= 'center' alignItems = 'center' >
                    </Grid>
                    <Grid xs = {12}  md = {5} lg = {5} direction = 'column' container>
                        <Box className={classes.box} >
                            <Box display = 'flex' flexDirection = 'row' justifyContent = 'space-between' alignItems = 'center' >
                                <p style ={{fontSize: 21, fontWeight: 500}}> All Feeds </p>
                                <Box display = 'flex' justify= 'center' alignItems = 'center' flexDirection = 'row' >
                                <p style ={{fontSize: 17, fontWeight: 800}}> AutoPilot</p>
                                <Switch/>
                                </Box>
                            </Box>
                        </Box>
                        <MessagesContainer messages = {props.messages}  automations = {props.automations} setStretch = {setStretch} isMe = {true} user = {props.user} />
                    </Grid>
                    <Grid  xs = {12}  md = {7} lg = {7} container>
                        <Container className={classes.container}>
                        <BaseChart/>
                        </Container>
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
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 0,
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },


}));

{/*<Switch*/}
{/*    checked={switchState}*/}
{/*    onChange={handleSwitch}*/}
{/*    color="primary"*/}
{/*    name="checkedB"*/}

{/*    inputProps={{'aria-label': 'primary checkbox'}}*/}
{/*/>*/}
{/*{(!switchState)*/}
{/*    ?*/}
{/*    <p style={{marginTop: 12, color: '#353C49'}}> Manager View </p>*/}
{/*    :*/}
{/*    <p style={{marginTop:12, color: '#3162F0'}}> Team View </p>*/}
{/*}*/}





export default BaseView;
