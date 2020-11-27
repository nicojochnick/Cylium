import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import Url from '../components/URL'
import firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from "../api/firebase";
import {auth} from "../api/firebase";
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { blue,} from '@material-ui/core/colors';

import Col from 'react-bootstrap/Col'
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer/Drawer";

const Feedback = (props) => {
    const classes = useStyles();
    return (
        <div>
        <Box className={classes.box} >
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar className = {classes.large} alt={props.item.email} src="/static/images/avatar/1.jpg" />
                </Grid>
                <Grid className = {classes.contained} item xs>
                    <p style = {{fontWeight: 450, fontSize: 18, marginTop: 0, color: "#4F5258"}}>{props.item.subject}</p>
                    <p style = {{marginTop: -15, fontSize: 12, color: "#4F5258"}}>{props.item.email}</p>
                    <p style = {{fontWeight: 400, fontSize: 15, color:"#4F5258", marginTop: 0}}>{props.item.feedback}</p>
                    <p style = {{marginTop: 0, fontSize: 12, color: "#9299A6"}}>{moment(props.item.timeStamp).startOf('day').fromNow()}</p>
                </Grid>
            </Grid>
        </Box>
            <Divider/>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    box:{
        padding: 25,
        // flexGrow: 1,
        // display: 'start',
        // overflow: 'auto',
        // flexDirection: 'row',
        backgroundColor: 'white'
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        color: theme.palette.getContrastText("#3574EE"),
        backgroundColor: "#B9C1CF",
    },
    contained: {
        marginRight: 50
    },
    hr: {
        size: 1,
        color: '#C6C9D1',
        borderColor: "#C6C9D1"

    }


}));

export default Feedback;
