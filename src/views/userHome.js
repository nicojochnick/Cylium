import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import Url from '../components/Old/Share/URL'
import firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from "../api/firebase";
import Feedback from "../components/Old/Feedback/feedback"
import moment from 'moment';
import RewardTracker from "../components/Old/Market/rewardTracker";
import Divider from "@material-ui/core/Divider";
import FeedbackTracker from "../components/Old/feedbackTracker";
import NetworkBrowse from "../components/Network/networkBrowse";
import ShareBoxx from "../components/Old/Share/shareBoxx";
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Survey from "../components/Survey/survey";
import TeamMemberStats from "../components/Analytics/teamMemberStats";
import Response from "../components/Messaging/response";


function UserHome(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Container fixed maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                    <Grid direction = 'column' container xs={12} sm={12} md={5} lg={5}>
                        <Box className={classes.boxSticky} boxShadow = {0} style = {{minHeight: 450, boxShadow: "0px 5px 10px #D7D7DA"}} borderRadius={10} >
                                <h2 style ={{margin: 15, marginRight: -10, color:"#9FA5B1", fontSize: 15, fontWeight: 600}}>
                                    SURVEY
                                </h2>
                            <Divider style ={{marginTop:0}}/>
                            <Survey/>

                        </Box>

                    </Grid>
                    <Grid item xs={12} sm ={12} md={7} lg={7}>
                        <Box borderRadius={10}  flexWrap="wrap" style = {{boxShadow: "0px 5px 5px #D7D7DA",}} boxShadow = {0} className={classes.box}>
                            <Grid justify="space-between" direction = "row" container>
                            <h2 style ={{margin: 15, marginRight: -10, color:"#9FA5B1", fontSize: 15, fontWeight: 600}}>
                                STATS
                            </h2>
                            </Grid>
                            <Divider style ={{marginTop:0}}/>
                            <TeamMemberStats/>

                        </Box>

                        <Box borderRadius={10}  flexWrap="wrap" style = {{boxShadow: "0px 5px 5px #D7D7DA",}} boxShadow = {0} className={classes.box}>
                            <Grid justify="space-between" direction = "row" container>
                                <h2 style ={{margin: 15, marginRight: -10, color:"#9FA5B1", fontSize: 15, fontWeight: 600}}>
                                    MY RESPONSES
                                </h2>
                            </Grid>
                            <Divider style ={{marginTop:0}}/>
                            <List  style={{maxHeight: '100%', overflow: 'auto'}}>
                                <Response item = {{}}/>
                            </List>
                        </Box>

                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box:{
        flexGrow: 1,
        padding: 0,
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        minHeight: 300,
    },

    boxSticky:{
        padding: 0,
        top: "5rem",
        position: "sticky",
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        minHeight: 300,
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    paper: {
        justify: 'center',
        padding: theme.spacing(2),
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 0,
    },

    fixedHeight: {
        height: 350,
    },
}));



export default UserHome;
