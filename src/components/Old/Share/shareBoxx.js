import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Url from "./URL"
import Switch from '@material-ui/core/Switch';
import RewardTracker from "../Market/rewardTracker";
import firebase from "../../../products/core/dashboard";
import {db} from "../../../api/firebase";

function ShareBoxx(props) {
    const [switchNotification, setSwitchNotification] = React.useState(props.user.sendFeedbackToEmail);
    const [points, setPoints] = React.useState(0);

    const handleSwitchNotification = async() => {
        setSwitchNotification(!switchNotification);
        console.log(props.user.email);
        let res = await db.collection('users').doc(props.email).update({
            sendFeedbackToEmail: !switchNotification
        });
    };
    const classes = useStyles();

    useEffect(() => {
        let points = 0;
        if (props.user.points) {
            points = props.user.points;
            setPoints(points)
        }
    }, []);

    return (
        <Grid style = {{width: '100%',}} xs={12} md={4} lg={3}>
        <Box flexWrap="wrap" style = {{boxShadow: "0px 5px 10px #D7D7DA",}} boxShadow = {0} className={classes.box}>
               <Url url = {props.url}/>
                <Divider/>
                <h2
                    style={{
                        color: "#9FA5B1",
                        fontSize: 15,
                        fontWeight: 600,
                        margin: 15,
                    }}>
                    SEND FEEDBACK TO EMAIL
                </h2>
                <Grid container direction = "row" >
                <Switch
                    style={{colorSecondary: '#3162F0',}}
                    checked={switchNotification}
                    onChange={handleSwitchNotification}
                    color="primary"
                    name="checkedB"
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
                {(!switchNotification)
                    ?
                    <p style={{marginTop: 7, color: '#353C49'}}> Off</p>
                    :
                    <p style={{marginTop: 7, color: '#3162F0'}}> On</p>
                }
                </Grid>
            </Box>
            <RewardTracker email = {props.email} points = {points} />

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

export default ShareBoxx;
