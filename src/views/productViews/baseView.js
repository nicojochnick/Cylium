import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MessagesContainer from "../../components/Messages/messagesContainer"
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import AutomationItem from "../../xdeprecated/Automation/automationItem";
import AutomationList from "../../xdeprecated/Automation/automationList";
import BaseChart from "../../components/Board/baseChart";
import SearchUsers from "../../components/Utilities/Search/searchUsers";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ProjectHeader from "../../components/Headers/projectHeader";
import clsx from 'clsx';
import {addChannel} from "../../api/firestore";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
function BaseView(props) {

    const classes = useStyles();
    const [switchState, setSwitch] = React.useState(false);
    const [isChatOpen, setIsChat] = React.useState(false);
    const [graphMDandLG, setGraphMDandLG] = React.useState(12)
    const [width, setWidth] = React.useState('88vw');
    const [users, setUsers] = React.useState([]);
    const [stretch, setStretch] = React.useState(7);
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);



    const openChat = () => {
        if (graphMDandLG === 12){
            setGraphMDandLG(8);
            setWidth('65vw')
        } else {
            setGraphMDandLG(12);
            setWidth('90vw')
        }
        setIsChat(!isChatOpen);

    };

    const getUsers = () => {


    };

    useEffect(() => {
        console.log('MESSAGES----->', props.messages);
        console.log(props.channel);
        getUsers();
        openChat()
    }, []);

    return (
        <div className={classes.root}>
            {/*<CssBaseline />*/}
            <AppBar
                style={{boxShadow: "0px 0px 0px #C8CEEB", marginTop:0,}}
                position="absolute"
                color = '#F7F7F7'
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar noWrap className={classes.toolbar}>
                    <ProjectHeader channel = {props.channel} />
                </Toolbar>
                <Divider/>
            </AppBar>
            <Grid className={classes.rootView} container spacing ={0}>
                    <Grid xs={4} md={4} lg={4} direction='column' container>
                        <MessagesContainer channel={props.channel} messages={props.messages}
                                           automations={props.automations} user={props.user}/>
                    </Grid>
                    <Grid  className={classes.root} xs = {8}  md = {8} lg = {8} container>
                        <BaseChart channel = {props.channel} user = {props.user} isChatOpen = {isChatOpen} viewWidth = {width} openChat = {openChat}  />
                    </Grid>
                </Grid>
        </div>
    );
}

const drawerWidth = 72;


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor:'white',
        display: 'flex',

    },
    rootView: {
        height: '100vh',
        flexGrow: 1,
        overflow:'hidden',
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
    appBarSpacer: theme.mixins.toolbar,

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#F8F8F8',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    toolbar: {
        paddingRight: 24,
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

{/*<ChannelHeader channel = {props.channel} user = {props.user}/>*/}


export default BaseView;
