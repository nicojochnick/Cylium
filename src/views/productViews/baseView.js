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
import { ChromePicker } from 'react-color';
import {addChannel, updateProjectColor} from "../../api/firestore";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { BiLock } from "react-icons/bi";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";






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
    const [color, setColor] = React.useState(props.channel.color);
    const [savedColor, setSavedColor] =React.useState(props.channel.color)

    const [openSettings, setSettingsOpen] = React.useState(false);


    const handleClickOpenSettings = () => {setSettingsOpen(true);};
    const handleCloseSettings = () => {setSettingsOpen(false);};

    const changeColor = () => {
        setColor(savedColor);
        updateProjectColor(savedColor, props.channel.channelID)
    };

    const saveColor = (color) => {
        setSavedColor(color.hex)
    };


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

    const isFollowing = ( ) =>{

        let projects = props.user.channelIDs;
        for (let i = 0; i < projects.length; i++){
            if (props.channel.channelID === projects[i]){
                return true;
            }
        }
        return false;
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
                    <ProjectHeader handleClickOpenSettings = { handleClickOpenSettings} user = {props.user} channel = {props.channel} />
                </Toolbar>
                <Divider/>
            </AppBar>
            {isFollowing()
                ? <Grid className={classes.rootView} container spacing={0}>
                    <Grid xs={4} md={4} lg={4} direction='column' container>
                        <MessagesContainer channel={props.channel} messages={props.messages}
                                           automations={props.automations} user={props.user}/>
                    </Grid>
                    <Grid className={classes.root} xs={8} md={8} lg={8} container>
                        <BaseChart channel={props.channel} user={props.user} isChatOpen={isChatOpen} viewWidth={width}
                                   openChat={openChat}/>
                    </Grid>
                </Grid>
                :
                <Grid container justify = 'center' alignItems = 'center' className = {classes.privateBoard}>
                    <Box flexDirection = 'column' display = 'flex' justifyContent={'center'} alignItems = 'center'>
                        <BiLock style = {{}} size = {70} />
                        <p> Board is private, follow to view.</p>
                    </Box>
                </Grid>
            }
            <Dialog
                open={openSettings}
                onClose={handleCloseSettings}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Box display = 'flex' flexDirection = 'column'>
                        <p style = {{fontSize:21, fontWeight: 600, margin: 0}}> Theme </p>
                        <p> Color: </p>

                        <ChromePicker
                            onChangeComplete={(color) => saveColor(color)  }
                            color = {savedColor}
                        />

                        <Button onClick={changeColor} variant={'contained'} style = {{backgroundColor: savedColor, margin: 10}}> Save </Button>




                    </Box>

                    <Divider/>


                </DialogContent>

            </Dialog>
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

    privateBoard: {
        height: '90vh',

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
