import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MessagesContainer from "../../components/Messages/Chat/messagesContainer"
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
import {addChannel, followProject, updateProjectColor} from "../../api/firestore";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { BiLock } from "react-icons/bi";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Rooms from "../../components/Messages/Rooms/rooms";
import IconButton from "@material-ui/core/IconButton";
import { BiCircle} from "react-icons/bi";
import ProjectProfile from "../../components/Profile/Project/projectProfile";
import Avatar from "@material-ui/core/Avatar";






function BaseView(props) {

    const classes = useStyles();
    const [switchState, setSwitch] = React.useState(false);
    const [isChatOpen, setIsChat] = React.useState(false);
    const [graphMDandLG, setGraphMDandLG] = React.useState(12)
    const [width, setWidth] = React.useState('100vw');
    const [users, setUsers] = React.useState([]);
    const [stretch, setStretch] = React.useState(7);
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [color, setColor] = React.useState(props.channel.color);
    const [savedColor, setSavedColor] =React.useState(props.channel.color);
    const [colorPickerOpen, setColorPickerOpen] = React.useState(false);

    const [openSettings, setSettingsOpen] = React.useState(false);

    const openColorPicker = () => {setColorPickerOpen(true)};


    const handleClickOpenSettings = () => {setSettingsOpen(!colorPickerOpen);};
    const handleCloseSettings = () => {setSettingsOpen(false);};

    const changeColor = () => {
        setColor(savedColor);
        updateProjectColor(savedColor, props.channel.channelID)
        setColorPickerOpen(false)
    };

    const saveColor = (color) => {
        setSavedColor(color.hex)
    };


    const openChat = () => {
        if (graphMDandLG === 12){
            setGraphMDandLG(8);
            setWidth('60vw')
        } else {
            setGraphMDandLG(12);
            setWidth('90vw')
        }
        setIsChat(!isChatOpen);

    };

    const getUsers = () => {

    };

    const handleFollow = () => {
        let pIds = props.user.projectIDs;
        pIds[props.channel.channelID] =  {viewPort: [0,0], zoom: 0.5};
        followProject(props.user.email, props.channel.channelID, pIds)
    };

    const isFollowing = ( ) => {
        let val = props.user.projects.includes(props.channel.channelID);
        console.log(val)
        return val;
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

            {isFollowing()
                ?

                <div className={classes.root}>
                    {/*<AppBar*/}
                    {/*    style={{boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`, marginTop:0,}}*/}
                    {/*    position="absolute"*/}
                    {/*    color = '#F7F7F7'*/}
                    {/*    className={clsx(classes.appBar, open && classes.appBarShift)}*/}
                    {/*>*/}
                    {/*    <Toolbar style = {{boxShadow: `5px 1px 10px -5px #838383`}} noWrap className={classes.toolbar}>*/}
                    {/*        <ProjectHeader handleClickOpenSettings = { handleClickOpenSettings} user = {props.user} channel = {props.channel} />*/}
                    {/*    </Toolbar>*/}
                    {/*    <Divider/>*/}
                    {/*</AppBar>*/}
                <Grid className={classes.rootView} container spacing={0}>

                        <Grid className={classes.root} xs={12} md={12} lg={12} container>

                            <BaseChart channel={props.channel} messages = {props.messages} user={props.user} isChatOpen={isChatOpen} viewWidth={width}
                                       openChat={openChat}/>

                        </Grid>

                </Grid>
                </div>

                :

                <div className={classes.root}>
                    <AppBar
                        style={{boxShadow: "0px 0px 0px #C8CEEB", marginTop:0,}}
                        position="absolute"
                        color = '#F7F7F7'
                        className={clsx(classes.appBar, open && classes.appBarShift)}
                    >
                        <Toolbar style = {{boxShadow: `5px 1px 10px -5px #838383`}} noWrap className={classes.toolbar}>
                        </Toolbar>
                        <Divider/>
                    </AppBar>

                <Grid container justify = 'center' alignItems = 'center' className = {classes.privateBoard}>
                    <Box flexDirection = 'column' display = 'flex' justifyContent={'center'} alignItems = 'center'>
                        <Box  style = {{margin: 5, padding: 3, marginTop: -40}} border = {2} borderColor = {'#D0D1D3'} borderRadius = {50}>

                        <Avatar className = {classes.large} src = {props.channel.img}/>
                        </Box>
                        <p style = {{fontSize: 26, margin:5, fontWeight: 600}}> {props.channel.name}</p>
                        <p style = {{fontSize: 16, margin: 5, }}> {props.channel.bio} </p>

                        <Button onClick={handleFollow} variant={'contained'} style = {{backgroundColor: props.channel.color, margin: 10}}> <p style = {{color:'white', margin:0}}> Follow </p> </Button>
                    </Box>
                </Grid>
                </div>

            }

            <Dialog
                open={openSettings}
                fullWidth={true}
                // maxWidth={maxWidth}
                onClose={handleCloseSettings}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Box display = 'flex' flexDirection = 'column'>
                        <p style = {{fontSize:15, fontWeight: 400, marginTop: 10}}> PROFILE </p>
                        <ProjectProfile channel = {props.channel} user = {props.user}/>
                        <Divider/>
                        <p style = {{fontSize:15, fontWeight: 400, marginTop: 10}}> THEME</p>
                        <Box display = 'flex' flexDirection = 'row' justifyContent = 'flex-start' alignItems = 'flex-start'>
                        <p style = {{fontWeight: 600}}> Color </p>

                            <IconButton>
                                <BiCircle onClick = {openColorPicker} size = {25} style = {{color:'white',backgroundColor: savedColor, borderRadius:100}}/>
                            </IconButton>

                            {colorPickerOpen

                                ? <ChromePicker
                                    onChangeComplete={(color) => saveColor(color)}
                                    color={savedColor}
                                />
                                :null
                            }
                        </Box>


                        <Button onClick={changeColor} variant={'contained'} style = {{backgroundColor: savedColor, marginTop: 10, marginBottom: 10, width: 180, borderRadius: 10}}> <p style = {{color:'white', margin: 0}}> Save Color </p></Button>




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
        paddingRight: 25,
        backgroundColor:'white',
    },

    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),

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


{/*<Grid container justify = 'center' alignItems = 'center' className = {classes.privateBoard}>*/}
{/*    <Box flexDirection = 'column' display = 'flex' justifyContent={'center'} alignItems = 'center'>*/}
{/*        <BiLock style = {{}} size = {70} />*/}
{/*        <p> {props.channel.name} is private.</p>*/}

{/*        <Button variant={'contained'} style = {{backgroundColor: props.channel.color}}> <p style = {{color:'white', margin:0}}> Follow </p> </Button>*/}
{/*    </Box>*/}
{/*</Grid>*/}


{/*<Grid style = {{boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`, zIndex: 5, border:1}} xs={4} sm={4} md={4} lg={4} direction='column' container>*/}
{/*    <Rooms channel={props.channel} messages={props.messages}*/}
{/*                       automations={props.automations} user={props.user}/>*/}
{/*</Grid>*/}

export default BaseView;
