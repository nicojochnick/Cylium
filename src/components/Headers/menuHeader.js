import React, {useEffect} from 'react';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase/InputBase";
import Badge from "@material-ui/core/Badge";
import Popover from "@material-ui/core/Popover/Popover";
import Notification from "../Notifications/notification";
import Button from "@material-ui/core/Button";
import clsx from 'clsx';
import {AccountCircle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";
import firebase from 'firebase/app';


function MenuHeader(props) {

    // let email = firebase.auth().currentUser.email;
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [notifications, setNotifications] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElNotification, setAnchorElNotification] = React.useState(null);
    const openAccount = Boolean(anchorEl);
    const id = openAccount ? 'simple-popover' : undefined;

    const signout = () => {
        firebase.auth().signOut().then(function() {
        }).catch(function(error) {
        });
    };


    const handleAccountClick = (event) => {setAnchorEl(event.currentTarget);};

    const handleNotificationClick = (event) => {
        setAnchorElNotification(event.currentTarget);
    };

    const handleCloseNotification = () => {
        setAnchorElNotification(null);
    };
    const handleClose = () => {setAnchorEl(null);};
    const openNotification = Boolean(anchorElNotification);
    const idNotification = openAccount ? 'simple-popover-notification' : undefined;

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box style = {{marginLeft: -10, marginRight: 10, height: 75, width: '100vw'}} display = 'flex' flexDirection = 'row' justifyContent = 'space-between' alignItems = 'center' >

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
                        {/*<SearchIcon />*/}
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
                            {/*<NotificationsIcon />*/}
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
                        <Box border = {1} borderColor = {"#4D6DF1"}  borderRadius = {5}
                             style ={{margin: 0, minWidth:400, maxHeight: 500}}>
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
                        <Button style = {{backgroundColor: "#5F7FFF"}} onClick={()=>signout()} variant="contained" color="primary">
                            Signout
                        </Button>
                    </Popover>
                </div>
            </Grid>

        </Box>
    );
}
const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default MenuHeader;
