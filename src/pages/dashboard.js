import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {BrowserRouter as Router, Switch, Route, Link, Redirect,} from "react-router-dom";
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
import EditFeedbox from "../views/editFeedbox"
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';


import Feed from "../views/feed"
import Feedbox from "../views/feedbox"
import {db} from "../api/firebase";


export default function Dashboard() {
    // let email = firebase.auth().currentUser.email;
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [url, setURL] = React.useState(null);
    const [email, setEmail] = React.useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        console.log('listen');
        let email = firebase.auth().currentUser.email;
        setEmail(email);
        console.log(email);
        db.collection("users").doc(email)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                setURL(doc.data().url)
            });
    }, []);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute"  color = 'white' className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
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


                    <Link to={`/feedboxx/${url}`} style={{ textDecoration: 'none' }}>
                    <Button  variant="contained" style={{
                        borderRadius: 5,
                        backgroundColor: "#3574EE",
                    }}>
                        <p style = {{color: 'white', margin: 5,fontWeight: 600}}>
                        Go to Live Box
                        </p>
                        </Button>
                    </Link>
                    </Grid>
                </Toolbar>
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
                    <h2 className="display-4">FeedBoxx</h2>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                        <Link to="/feed"  style={{ color:"#3C3F48", textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <IoIosMail size = {25}/>
                                </ListItemIcon>
                                <ListItemText primary="Feedback" />
                            </ListItem>
                        </Link>
                    <Link to="/editfeedboxx" style={{fontWeight: 600, color:"#3C3F48", textDecoration: 'none' }} >
                        <ListItem button>
                            <ListItemIcon>
                                <FaEdit size = {20}/>
                            </ListItemIcon>
                            <ListItemText  primary="My Boxx" />
                        </ListItem>
                    </Link>
                    <Link to="/dashboard"  style={{ textDecoration: 'none' }}>
                    </Link>
                    <div>
                    </div>
                </List>
                <Divider />
            </Drawer>

                {(url) ?
                    < main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Switch>
                            <Route exact path="/feed">
                                <Feed url = {url} isSubscribed = {false}/>
                            </Route>
                            <Route path="/editfeedboxx">
                                <EditFeedbox url = {url} email = {email} />
                            </Route>
                            <Route path="/settings">
                                <Settings/>
                            </Route>
                        </Switch>

                    </main>
                    : <p> LOADING</p>
                }
            </Router>
        </div>

    );
};

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
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

