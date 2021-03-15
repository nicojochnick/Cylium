import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MessagesContainer from "../components/Messages/messagesContainer"
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import AutomationItem from "../components/Apps/Automation/automationItem";
import AutomationList from "../components/Apps/Automation/automationList";
import BaseChart from "../components/Flow/baseChart";
import SearchUsers from "../components/Utilities/Search/searchUsers";
import ChannelHeader from "../components/Channels/ChannelHeader";
function BaseView(props) {

    const classes = useStyles();
    const [switchState, setSwitch] = React.useState(false);
    const [isChatOpen, setIsChat] = React.useState(false);
    const [graphMDandLG, setGraphMDandLG] = React.useState(12)
    const [width, setWidth] = React.useState('88vw')
    const [stretch, setStretch] = React.useState(6);
    const handleSwitch = (event) => {
        setSwitch(!switchState);
    };


    const openChat = () => {
        if (graphMDandLG === 12){
            setGraphMDandLG(7)
            setWidth('52vw')
        } else {
            setGraphMDandLG(12)
            setWidth('88vw')
        }
        setIsChat(!isChatOpen);

    };

    useEffect(() => {
        console.log('MESSAGES----->', props.messages)
        console.log(props.channel)
    }, []);


    return (
        <div className={classes.root}>
            <Grid style = {{height: '100vh'}} className={classes.root} container spacing ={0}>
                {(isChatOpen)
                    ?<Grid className={classes.root} xs={0} md={5} lg={5} direction='column' container>
                        <ChannelHeader user={props.user}/>
                        <Divider/>
                        <MessagesContainer channel={props.channel} messages={props.messages}
                                           automations={props.automations} user={props.user}/>
                    </Grid>
                    :null
                }
                    <Grid  className={classes.root} xs = {12}  md = {graphMDandLG} lg = {graphMDandLG} container>
                        <div className={classes.container}>
                        <BaseChart isChatOpen = {isChatOpen} viewWidth = {width} openChat = {openChat} channel = {props.channel} user = {props.user} />
                        </div>
                    </Grid>
                </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor:'white',
        overflow:'hidden'
    },
    box:{
        flexGrow: 1,
        padding: 0,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 0,
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        flexGrow: 1,

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

//
//
// <Box display = 'flex' justify= 'center' alignItems = 'center' flexDirection = 'row' >
//     <p style ={{fontSize: 17, fontWeight: 800}}> AutoPilot</p>
//     <Switch/>
// </Box>



export default BaseView;
