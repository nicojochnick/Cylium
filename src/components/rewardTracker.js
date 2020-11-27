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


function RewardTracker(props) {
    const classes = useStyles();
    let isSubscribed = props.isSubscribed;

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <Grid item xs={12} md={4} lg={3}>
            <Box boxShadow = {4} className={classes.box}>
                <h2
                    style ={{
                        margin: 15,
                        color:"#9FA5B1",
                        fontSize: 15,
                        fontWeight: 600
                    }}>
                    REWARDS
                </h2>
                <Divider style ={{marginTop:30, marginBottom: -20}}/>
                <div style = {{padding: 20,paddingTop:0,margin:0 }}>

                    <h2 style = {{color:"#686D75", fontSize: 40}}> ${0}
                    </h2>
                    <p style = {{color: "#686D75", marginTop: -30}}> available </p>

                    <Button
                        className={classes.submitButton}
                        variant="contained"
                        type='submit'
                        style={{
                            padding:5,
                            paddingRight: 40,
                            paddingLeft: 40,
                            borderRadius: 5,
                            backgroundColor: "#3574EE",
                        }}>

                        <p style = {{color: 'white', fontWeight: '600', margin: 5}}>
                            Get Rewards
                        </p>

                    </Button>

                </div>

            </Box>
        </Grid>
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
