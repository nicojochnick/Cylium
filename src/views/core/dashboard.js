import React, {useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {BrowserRouter as Router, Link, Route, Switch,} from "react-router-dom";
import clsx from 'clsx';
import {fade, makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {BiHome,BiCircle, BiWorld,  BiPlanet, BiPlus, BiUser} from "react-icons/bi";
import BaseView from '../productViews/baseView'
import AccountView from "../productViews/accountView"
import {addChannel} from "../../api/firestore";
import HomeView from "../productViews/homeView";
import cylogo from "../../assets/images/cylogo.png";
import Box from "@material-ui/core/Box";


export default function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAccount = Boolean(anchorEl);
    const [key, setKey] = React.useState(Math.random())
    const id = openAccount ? 'simple-popover' : undefined;

    const handleClose = () => {setAnchorEl(null);};
    const handleDrawerOpen = () => {setOpen(true);};
    const handleDrawerClose = () => {setOpen(false);};
    const signout = () => {
        firebase.auth().signOut().then(function() {
        }).catch(function(error) {
        });
    };


    const addChannelDB= () => {
        addChannel(props.user.email, props.user.channelIDs, props.user.projectIDs)
    };


    const getDirection = (present)=>{
        let str = '/'
        if (typeof present === 'string') {
            str = "/" + present.toLowerCase()
        }
        console.log(str)
      return str
    };


    useEffect(() => {
    }, []);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Router>
            {/*<Drawer*/}
            {/*    variant="permanent"*/}
            {/*    classes={{*/}
            {/*        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),*/}
            {/*    }}*/}
            {/*    open={open}*/}
            {/*>*/}
            {/*    <div className={classes.toolbarIcon}>*/}
            {/*        /!*<img style = {{height: 35, marginLeft: 10}}/>*!/*/}
            {/*        /!*<IconButton onClick={handleDrawerClose}>*!/*/}
            {/*            <img style = {{height: 43, width: 46, marginLeft:-3}} src = {cylogo} />*/}

            {/*            /!*<ChevronLeftIcon style = {{color:'#3C3F48'}} color = "white"  />*!/*/}
            {/*        /!*</IconButton>*!/*/}
            {/*    </div>*/}
            {/*    <Divider/>*/}
            {/*    <Link to="/feed" style={{textDecoration: 'none' }} >*/}
            {/*    <ListItem >*/}
            {/*        <ListItemIcon>*/}
            {/*            <BiWorld size = {25} style = {{color:'#3C3F48'}}  />*/}
            {/*        </ListItemIcon>*/}
            {/*        <ListItemText style = {{color: '#3C3F48', fontWeight: 600}} primary="Home" />*/}
            {/*    </ListItem>*/}
            {/*    </Link>*/}
            {/*    <Divider/>*/}
            {/*    <List>*/}
            {/*        {Object.keys(props.channels).map((item)=>*/}
            {/*                <Link onClick={()=>setKey(Math.random())} to={"/" + props.channels[item].channelID.toLowerCase()}   style={{ color:"white", textDecoration: 'none' }}>*/}
            {/*                    <ListItem button>*/}
            {/*                        <ListItemIcon>*/}
            {/*                            <BiCircle size = {25} style = {{color:props.channels[item].color}}  />*/}
            {/*                        </ListItemIcon>*/}
            {/*                        <ListItemText style = {{color:props.channels[item].color, fontWeight: 600}} primary={props.channels[item].name} />*/}
            {/*                    </ListItem>*/}
            {/*                </Link>*/}
            {/*        )}*/}
            {/*        <Divider/>*/}
            {/*        <ListItem button onClick = {()=>addChannelDB()} >*/}
            {/*                <ListItemIcon >*/}
            {/*                    <BiPlus size = {25} style = {{color:'#3C3F48'}}  />*/}
            {/*                </ListItemIcon>*/}
            {/*                <ListItemText style = {{color: '#3C3F48', fontWeight: 600}} primary="Add Channel" />*/}
            {/*        </ListItem>*/}
            {/*        <Divider/>*/}
            {/*            <Link to="/account"  style={{ color:"white", textDecoration: 'none' }}>*/}
            {/*                <ListItem button>*/}
            {/*                    <ListItemIcon>*/}
            {/*                        <BiUser size = {25} style = {{color:'#3C3F48'}}  />*/}
            {/*                    </ListItemIcon>*/}
            {/*                    <ListItemText style = {{color: '#3C3F48', fontWeight: 600}} primary="Account" />*/}
            {/*                </ListItem>*/}
            {/*            </Link>*/}
            {/*        <div>*/}
            {/*        </div>*/}
            {/*    </List>*/}
            {/*    <Divider />*/}
            {/*</Drawer>*/}
                {(props.user) ?
                    < main className={classes.content}>
                        {/*<div className={classes.appBarSpacer} />*/}

                        <Switch>
                            <Route exact path="/feed">
                                <HomeView notifications = {props.notifications}  team = {null} email = {props.email} url = {props.url} user = {props.user}/>
                            </Route>
                            {Object.keys(props.allChannels).map((item)=>
                                    <Route key={key} exact path={getDirection(props.allChannels[item].channelID)}>
                                        <BaseView
                                            messages={props.messages.filter(i => i.channelID === props.allChannels[item].channelID)}
                                            channel={props.allChannels[item]}
                                            automations={props.automations}
                                            user={props.user}
                                            url={props.url}
                                            email={props.email}/>
                                     </Route>

                            )
                            }
                            <Route path="/account">
                                <AccountView notifications = {props.notifications} team = {null} email = {props.email} url = {props.url} user = {props.user}/>
                            </Route>
                        </Switch>
                    </main>
                    :
                    <p> LOADING</p>
                }
            </Router>
        </div>
    );
};

const drawerWidth = 190;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
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
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        backgroundColor: '#F8F8F8',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'hidden',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
    },
    fixedHeight: {
        height: 240,
    },
    search: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: fade("#A8ADBC", 0.15),
        '&:hover': {
            backgroundColor: fade("#A8ADBC", 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

}));


///Links

{/*<Link*/}
{/*    to="/feedboxx-edit"*/}
{/*    style={{fontWeight: 600,*/}
{/*        color:"#3C3F48",*/}
{/*        textDecoration: 'none'*/}
{/*    }} >*/}
{/*    <ListItem button>*/}
{/*        <ListItemIcon>*/}
{/*            <BiEdit size = {25} style = {{color:'white'}} />*/}
{/*        </ListItemIcon>*/}
{/*        <ListItemText  style = {{color: 'white', fontWeight: 600}} primary="Edit" />*/}
{/*    </ListItem>*/}
{/*</Link>*/}

{/*<Link to="/transactions"  style={{ color:"#3C3F48", textDecoration: 'none' }}>*/}
{/*    <ListItem button>*/}
{/*        <ListItemIcon>*/}
{/*            <BiTransferAlt size = {25}/>*/}
{/*        </ListItemIcon>*/}
{/*        <ListItemText primary="Transactions" />*/}
{/*    </ListItem>*/}
{/*</Link>*/}




//go to feedboxx button

{/*    <Link to={`/feedboxx/${url}`} style={{ textDecoration: 'none' }}>*/}
{/*<Button  variant="contained" noWrap style={{*/}
{/*    borderRadius: 5,*/}
{/*    margin: 10,*/}
{/*    marginRight: 20,*/}
{/*    backgroundColor: '#4D6DF1',*/}
{/*}}>*/}
{/*    <p style = {{color: 'white', margin: 3,fontWeight: 600}}>*/}
{/*        My Feedboxx*/}
{/*    </p>*/}
{/*    </Button>*/}
{/*</Link>*/}


//old links


{/*<Route exact path="/feedboxx-edit">*/}
{/*    <EditFeedbox user = {user} url = {url} email = {email} />*/}
{/*</Route>*/}
{/*<Route exact path="/lead">*/}
{/*    <TeamHome getSurvey = {getSurvey} survey = {survey} user = {user} url = {url} email = {email}/>*/}
{/*</Route>*/}




{/*<Link to="/feed"  style={{ color:"#3C3F48", textDecoration: 'none' }}>*/}
{/*    <ListItem button>*/}
{/*        <ListItemIcon>*/}
{/*            <BiEdit size = {25} style = {{color:'white'}}  />*/}
{/*        </ListItemIcon>*/}
{/*        <ListItemText style = {{color: 'white', fontWeight: 600}} primary="Respond" />*/}
{/*    </ListItem>*/}
{/*</Link>*/}



{/*<Link to="/automationstore"  style={{ color:"white", textDecoration: 'none' }}>*/}
{/*    <ListItem button>*/}
{/*        <ListItemIcon>*/}
{/*            <BiDonateHeart size = {25} style = {{color:'#3C3F48'}}  />*/}
{/*        </ListItemIcon>*/}
{/*        <ListItemText style = {{color: '#3C3F48', fontWeight: 600}} primary="Community" />*/}
{/*    </ListItem>*/}
{/*</Link>*/}


//
//
// const getTeam = async(user) => {
//     if (user) {
//         await db.collection("teams").doc(user.team)
//             .onSnapshot(function(doc) {
//                 setTeam(doc.data())
//                 console.log(doc.data())
//             });
//
//     } else {
//         console.log('ERROR: no user')
//     }
//
// };




///


{/*<Link to="/automations"  style={{ color:"white", textDecoration: 'none' }}>*/}
{/*    <ListItem button>*/}
{/*        <ListItemIcon>*/}
{/*            <BiNetworkChart size = {25} style = {{color:'#3C3F48'}}  />*/}
{/*        <ListItemText style = {{color: '#3C3F48', fontWeight: 600}} primary="Processes" />*/}
{/*    </ListItem>*/}
{/*</Link>*/}




//

{/*<Route exact path="/automations">*/}
{/*    <AutomationView team = {null}  automations = {props.automations} user = {props.user} url = {props.url} email = {props.email} />*/}
{/*</Route>*/}



///appbar

{/*<AppBar*/}
{/*    style={{boxShadow: "0px 0px 0px #C8CEEB", marginTop:0}}*/}
{/*    position="absolute"*/}
{/*    color = '#F7F7F7'*/}
{/*    className={clsx(classes.appBar, open && classes.appBarShift)}*/}
{/*>*/}
{/*    <Toolbar noWrap className={classes.toolbar}>*/}
{/*        <ProjectHeader/>*/}
{/*    </Toolbar>*/}
{/*    <Divider/>*/}
{/*</AppBar>*/}
