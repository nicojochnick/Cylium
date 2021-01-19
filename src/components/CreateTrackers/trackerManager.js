import React from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import Switch from "@material-ui/core/Switch/Switch";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import 'emoji-mart/css/emoji-mart.css'
import { Picker, NimblePicker } from 'emoji-mart'
import {TwitterPicker} from "react-color";
import TyperTracker from "../Typers/typerTracker";


function TrackerManager(props) {
    const classes = useStyles();

    const [title, setTitle] = React.useState(props.tracker.trackerName);
    const [backgroundColor, setBackgroundColor] = React.useState('#fff')

    const handleTitleChange= (name) => {
        setTitle(name)
    };

    const handleChangeComplete = (color) => {
        setBackgroundColor(color.hex )
    };

    console.log(props.tracker.call)

    return (
        <div className={classes.root}>
            <Grid  direction = 'column' container>
                <Grid item>
                    <Box style = {{margin: 20}}>
                    <p>
                        Title and Color
                    </p>
                        <Grid spacing={2} container direction = 'row'>
                            <Grid spacing={3} item xs={4} md = {6} lg = {6} >
                                <Box>
                                    <TextField
                                        onChange={e => handleTitleChange(e.target.value)}
                                        id="filled-basic"
                                        label="Title"
                                        placeholder='Add a Title'
                                        fullWidth
                                        variant="outlined"
                                        value = {title}
                                        style = {{marginBottom: 10}}

                                    />
                                    <Grid container space = {2} direction = 'row'>

                                    </Grid>
                                </Box>
                            </Grid>

                            <Grid item xs={8} md = {6} lg = {6}>
                                <Box style = {{marginTop: -40}}>
                                            <TwitterPicker
                                                color={ backgroundColor}
                                                onChangeComplete={ handleChangeComplete }
                                            />
                                </Box>
                                    </Grid>
                                    <Grid spacing={3} item xs={6} >
                                        {/*<div style={{height: 200}}>*/}
                                        <Box>
                                        </Box>
                                    </Grid>
                        </Grid>
                    </Box>
                    <Divider/>
                </Grid>
                <Grid item>
                    <Box style = {{margin: 20}}>
                        <p>
                            Data
                        </p>
                        <Grid spacing={3} container direction = 'row'>
                            <Grid  item xs={12} md = {6} lg = {6} >

                        {(props.tracker.call)
                            ?
                            <div>
                                {Object.keys(props.tracker.call).map((item) =>

                                    <Box borderRadius ={10} style ={{padding: 5, margin: 10, boxShadow: "0px 5px 10px #D7D7DA", }} >

                                    <p style = {{marginLeft: 5}}>
                                        {props.tracker.call[item].label}

                                    </p>
                                    </Box>
                                )}

                            </div>
                            : null
                        }
                            </Grid>
                            <Grid spacing={3} item xs={12} md = {6} lg = {6} >

                            </Grid>

                        </Grid>
                    </Box>
                        <Divider/>

                </Grid>
                <Grid item>
                    <Box style = {{margin: 20}}>
                    <p>
                        Users and Permissions
                    </p>
                    </Box>
                    <Divider/>
                </Grid>
            </Grid>

        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        // margin: 10,
        // marginBottom: 20,
        backgroundColor: 'white',
    },

    inner_box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    boxSticky:{
        padding: 0,
        top: "0rem",
        position: "sticky",
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        // backgroundColor: 'white',
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

export default TrackerManager;
