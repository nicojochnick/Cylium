import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {BrowserRouter as Router, HashRouter, Switch, Route, Link, Redirect,} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { IoIosMail } from "react-icons/io";
import {FaEdit} from "react-icons/fa"
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Settings from "../views/settings"
import EditFeedbox from "../views/Old/editFeedbox"
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import SettingsIcon from '@material-ui/icons/Settings';
import logo from "../assets/images/logo.png"
import logowhite from "../assets/images/TeamBoxxWhite.png"
import UserHome from '../views/Old/userHome'
import TeamHome from '../views/Old/teamHome'
import { BiTransferAlt, BiEdit, BiHome, BiUser} from "react-icons/bi";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Base from '../views/base'
import {db} from "../api/firebase";
import Popover from "@material-ui/core/Popover/Popover";
import Transactions from "../views/Old/transactions";
import Feedback from "../components/Old/Feedback/feedback";
import Notification from "../components/Utilities/Notifications/notification";

export default function Dashboard() {
    // let email = firebase.auth().currentUser.email;
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [url, setURL] = React.useState(null);
    const [team, setTeam] = React.useState({});
    const [email, setEmail] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [notifications, setNotifications] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleAccountClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    const openAccount = Boolean(anchorEl);
    const id = openAccount ? 'simple-popover' : undefined;

    const [anchorElNotification, setAnchorElNotification] = React.useState(null);

    const handleNotificationClick = (event) => {
        setAnchorElNotification(event.currentTarget);
    };

    const handleCloseNotification = () => {
        setAnchorElNotification(null);
    };
    const openNotification = Boolean(anchorElNotification);
    const idNotification = openAccount ? 'simple-popover-notification' : undefined;

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const signout = () => {
        firebase.auth().signOut().then(function() {
        }).catch(function(error) {
        });
    };

    const getUser = async(email) => {
        await db.collection("users").doc(email)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                //Fixes bug where doc.data() is undefined on first signin
                let user = doc.data()
                if (user) {
                    setURL(user.url);
                    setUser(user);
                    getTeam(user);
                }
            });

    };

    const getTeam = async(user) => {
        if (user) {
            await db.collection("teams").doc(user.team)
                .onSnapshot(function(doc) {
                    setTeam(doc.data())
                    console.log(doc.data())
            });

        } else {
            console.log('nouser')
        }

    };

    useEffect(() => {
        let email = firebase.auth().currentUser.email;
        setEmail(email);
        getUser(email);
    }, []);



    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                style={{boxShadow: "0px 0px 0px #C8CEEB", marginTop:0}}
                position="absolute"
                color = 'white'
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar noWrap className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                    <Box
                        borderRadius={16}
                        style ={{margin: 10}}
                        className={classes.search}
                    >
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Box>
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                onClick={handleNotificationClick}
                                aria-haspopup="true"
                                style = {{margin: 5}} aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={1} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <Popover
                                style = {{borderRadius: 10, marginRight: 20}}
                                id={idNotification}
                                open={openNotification}
                                anchorEl={anchorElNotification}
                                onClose={handleCloseNotification}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Box border = {1} borderColor = {"#4D6DF1"}  borderRadius = {5} style = {{margin: 0, minWidth:400, maxHeight: 500}}>
                                    {notifications.map((item) => <Notification item = {item}/>)}
                                </Box>
                            </Popover>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            style = {{margin: 5}}
                            onClick={handleAccountClick}
                            color="inherit"
                        >
                            <AccountCircle />

                        </IconButton>
                            <Popover
                                id={id}
                                open={openAccount}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Button style = {{backgroundColor: "#5F7FFF"}}onClick={()=>signout()} variant="contained" color="primary">
                                  Signout
                                </Button>
                            </Popover>
                        </div>
                    </Grid>
                </Toolbar>
                <Divider/>
            </AppBar>
            <Router>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <img style = {{height: 44, marginLeft: 10}} src ={logowhite}/>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon style = {{color:'white'}} color = "white"  />
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <Link to="/feed"  style={{ color:"#3C3F48", textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <BiHome size = {25} style = {{color:'white'}}  />
                            </ListItemIcon>
                            <ListItemText style = {{color: 'white', fontWeight: 600}} primary="Home" />
                        </ListItem>
                    </Link>
                    {/*<Link to="/feed"  style={{ color:"#3C3F48", textDecoration: 'none' }}>*/}
                    {/*    <ListItem button>*/}
                    {/*        <ListItemIcon>*/}
                    {/*            <BiEdit size = {25} style = {{color:'white'}}  />*/}
                    {/*        </ListItemIcon>*/}
                    {/*        <ListItemText style = {{color: 'white', fontWeight: 600}} primary="Respond" />*/}
                    {/*    </ListItem>*/}
                    {/*</Link>*/}
                        <Link to="/settings"  style={{ color:"#3C3F48", textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <BiUser size = {25} style = {{color:'white'}}  />
                                </ListItemIcon>
                                <ListItemText style = {{color: 'white', fontWeight: 600}} primary="Profile" />
                            </ListItem>
                        </Link>
                    <div>
                    </div>
                </List>
                <Divider />
            </Drawer>
                {(url && user) ?
                    < main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Switch>
                            <Route exact path="/feed">
                                <Base team = {team} user = {user} url = {url} email = {email} isSubscribed = {false}/>
                            </Route>
                            <Route path="/settings">
                                <Settings email = {email} url = {url}  user = {user}/>
                            </Route>
                        </Switch>
                    </main>
                    : <p> LOADING</p>
                }
            </Router>
        </div>

    );
};

const drawerWidth = 200;
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
        backgroundColor: '#302F3C',
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
        overflow: 'auto',
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
