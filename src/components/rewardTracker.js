import React from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import Box from "@material-ui/core/Box";
import Card from 'react-bootstrap/Card'
import teamwork from '../assets/images/teamwork.svg'
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import FeedbackTracker from "./feedbackTracker";


function RewardTracker(props) {
    const classes = useStyles();
    let isSubscribed = props.isSubscribed;

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
            <Box boxShadow = {4} className={classes.box}>
                <h2
                    style ={{
                        margin: 15,
                        color:"#9FA5B1",
                        fontSize: 15,
                        fontWeight: 600
                    }}>
                    POINTS
                </h2>
                <Divider style ={{marginTop:20, marginBottom: -20}}/>
                <div style = {{padding: 20,paddingTop:0,margin:0 }}>
                    <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                    >
                        <div>
                    <h2 style = {{color:"#686D75", fontSize: 40, textAlign:"center"}}> {0}
                    </h2>
                    <p style = {{color: "#686D75", marginTop: -30, textAlign:"center"}}> Available </p>
                    </div>

                    {/*<h2 style = {{color:"#686D75", fontSize: 40}}> {10}*/}
                    {/*</h2>*/}
                    {/*<p style = {{color: "#686D75", marginTop: -30}}> received</p>*/}

                    </Grid>
                    <Divider style = {{margin:10}}/>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center">

                    <Button
                        variant="contained"
                        style={{
                            borderRadius: 8,
                            margin: 3,
                            padding: 3,
                            backgroundColor: '#4D6DF1',
                        }}>

                        <p style = {{color: 'white', fontWeight: '600', margin: 5, marginRight: 8, marginLeft: 8}}>
                            Add Points
                        </p>
                    </Button>
                        <Button
                            variant="contained"
                            style={{
                                borderRadius: 8,
                                padding: 3,
                                margin: 3,
                                backgroundColor: '#4D6DF1',
                            }}>
                            <p style = {{color: 'white', fontWeight: '600', margin: 5, marginRight: 8, marginLeft: 8}}>
                                Cash In
                            </p>
                        </Button>
                    </Grid>

                </div>

            </Box>


    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    box:{
        flexGrow: 1,
        borderRadius: 10,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white'
    },

    rewardsImage: {
        height: 120,
        margin: 0,
        padding: 0,
        marginLeft: -10,

    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
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

export default RewardTracker;
