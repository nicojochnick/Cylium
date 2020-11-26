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

const Feedback = (props) => {
    const classes = useStyles();
    return (
        <Box className={classes.box} boxShadow = {3}  borderRadius={7} >
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar className = {classes.large} alt={props.item.email} src="/static/images/avatar/1.jpg" />
                </Grid>
                <Grid className = {classes.contained} item xs>
                    <p style = {{fontWeight: 550, fontSize: 18, marginTop: 0}}>{props.item.subject}</p>
                    <p style = {{marginTop: -15, fontSize: 12}}>{props.item.email}</p>
                    <p style = {{fontWeight: 400, fontSize: 15, marginTop: 0}}>{props.item.feedback}</p>
                    <p style = {{marginTop: 0, fontSize: 12}}>{moment(props.item.timeStamp).startOf('day').fromNow()}</p>
                </Grid>
            </Grid>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    box:{
        // flexGrow: 1,
        padding: 15,
        // display: 'start',
        // overflow: 'auto',
        // flexDirection: 'row',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white'
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        color: theme.palette.getContrastText("#3574EE"),
        backgroundColor: "#3574EE",
    },
    contained: {
        marginRight: 50
    }


}));

export default Feedback;
