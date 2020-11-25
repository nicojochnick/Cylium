import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {BrowserRouter as Router, Switch, Route, Link, Redirect,} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from '../components/listItems';
import Button from '@material-ui/core/Button';
import { IoIosMail } from "react-icons/io";
import {FaEdit} from "react-icons/fa"
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import LayersIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Settings from "../views/settings"
import EditFeedbox from "../views/editFeedbox"
import Feed from "../views/feed"
import Feedbox from "../views/feedbox"
import {db} from "../api/firebase";


export default function Dashboard() {
    // let email = firebase.auth().currentUser.email;
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [url, setURL] = React.useState();
    useEffect(() => {
        let email = firebase.auth().currentUser.email;
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
                    {/*<Route path="feedboxx" component={Feedbox}>*/}
                    {/*    <Route path="/feedboxx/:userName" component={Feedbox}/> // dynamic route*/}
                    {/*</Route>*/}
                    {/*<Link to={`/feedboxx/ ${url}`} >*/}

                    <Link to="/feedboxx/nico">
                    <Button  variant="contained" color="primary"> Go to Live Box</Button>
                    </Link>
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
                    <h1 className="display-4">FeedBoxx</h1>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                        <Link to="/feed">
                            <ListItem button>
                                <ListItemIcon>
                                    <IoIosMail size = {25}/>
                                </ListItemIcon>
                                <ListItemText primary="Feedback" />
                            </ListItem>
                        </Link>

                    <Link to="/editfeedboxx">
                        <ListItem button>
                            <ListItemIcon>
                                <FaEdit size = {20}/>
                            </ListItemIcon>
                            <ListItemText primary="My Box" />
                        </ListItem>

                    </Link>

                    <Link to="/dashboard">
                    </Link>



                    <div>

                    </div>

                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Switch>
                    <Route exact path="/feed">
                        <Feed/>
                    </Route>
                    <Route path="/editfeedboxx">
                        <EditFeedbox/>
                    </Route>
                    <Route path="/settings">
                        <Settings/>
                    </Route>
                </Switch>

            </main>
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
}));

