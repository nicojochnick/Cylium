import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";


import {makeStyles} from "@material-ui/core/styles";
import TrackerItem from "../components/Trackers/trackerItem";
import TrackersList from "../components/Trackers/trackersList";
function Base(props) {

    const classes = useStyles();
    const [switchState, setSwitch] = React.useState(false);
    const [stretch, setStretch] = React.useState(6);
    const handleSwitch = (event) => {
        setSwitch(!switchState);
    };


    return (
        <div className={classes.root} >
            <Container className={classes.container}>
                <Grid container spacing={1}>
                    <Grid container
                          direction='row'
                          justify= 'center'
                          alignItems = 'center' >
                    </Grid>
                    <Grid xs = {12}  md = {stretch} lg = {stretch} container>
                        <TrackersList setStretch = {setStretch} isMe = {true} isTeamView = {switchState} team = {props.team} user = {props.user} />
                        {/*<TrackerItem/>*/}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
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


}));

{/*<Switch*/}
{/*    checked={switchState}*/}
{/*    onChange={handleSwitch}*/}
{/*    color="primary"*/}
{/*    name="checkedB"*/}

{/*    inputProps={{'aria-label': 'primary checkbox'}}*/}
{/*/>*/}
{/*{(!switchState)*/}
{/*    ?*/}
{/*    <p style={{marginTop: 12, color: '#353C49'}}> Manager View </p>*/}
{/*    :*/}
{/*    <p style={{marginTop:12, color: '#3162F0'}}> Team View </p>*/}
{/*}*/}





export default Base;
