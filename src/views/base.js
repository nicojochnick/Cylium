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
    return (
        <div className={classes.root} >
            <Container fixed maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                    <Grid container direction='row' justify= 'center' alignItems = 'center' >
                        <FormControl component="fieldset">
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    value="top"
                                    control={<Switch color="primary" />}
                                    label="Manager View"
                                    labelPlacement="right"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid xs = {12} item>
                        <TrackersList team = {props.team} user = {props.user} />
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


}));




export default Base;
