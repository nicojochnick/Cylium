import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField";
import Box from "@material-ui/core/Box";
import EditablePage from "./DocumentApp/components/editablePage";


function DocumentApp(props) {
    const classes = useStyles();
    return (
        <div style = {{backgroundColor: props.user.theme === 'dark' ? '#363638' : 'white' }} className={classes.root}>
        <Grid style = {{backgroundColor: props.user.theme === 'dark' ? '#363638' : 'white' }} container>
            <Grid item xs={0} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
                <Box style = {{margin: 50}}>
                <TextField
                    onChange={(e)=> props.changeTitle(e.target.value)}
                    id="standard-basic"
                    placeholder="Untitled"
                    value={props.title}
                    InputProps={{style: {fontSize: 50, fontWeight: 600, margin: 10, color:props.user.theme === 'dark' ? 'white' : 'black' }, disableUnderline: true,}}
                />
                <EditablePage data = {props.data} originList = {props.originList} changeContent = {props.changeContent}  />
                </Box>
            </Grid>
            <Grid item xs={0} sm={2}>
            </Grid>
        </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

export default DocumentApp;
