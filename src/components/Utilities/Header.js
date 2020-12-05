
import { Link } from 'react-router-dom';
import { auth } from '../../api/firebase';
import Container from '@material-ui/core/Container';
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import logo from "../../assets/images/logo.png";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar color = "white" position="static">
                <Toolbar>
                    <Grid container
                          direction="row"
                          justify="space-between"
                          alignItems="center">
                        <Link to="/">
                        <img style = {{height: 48}} src ={logo}/>
                        </Link>
                        <Link to={`/login`} style={{ textDecoration: 'none' }}>
                        <Button  variant="contained" noWrap style={{
                            borderRadius: 5,
                            margin: 10,
                            backgroundColor: '#4D6DF1',
                        }}>
                            <p style = {{color: 'white', margin: 2, marginRight: 20, marginLeft: 20,fontWeight: 500}}>
                                Login
                            </p>
                        </Button>
                        </Link>
                    </Grid>
                </Toolbar>
            </AppBar>

        </div>
    );
}

export default Header;
