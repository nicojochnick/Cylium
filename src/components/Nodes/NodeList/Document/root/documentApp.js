import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField";
import Box from "@material-ui/core/Box";
import EditablePage from "../components/editablePage";


function DocumentApp(props) {
    const classes = useStyles();

    return (

        <div className={classes.root}>

        <Grid container>

            <Grid item xs={0} sm={2}>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Box style = {{margin: 50}}>

                <TextField
                    onChange={(e)=> props.changeTitle(e.target.value)}
                    id="standard-basic"
                    placeholder="Untitled"
                    value={props.title}
                    InputProps={{style: {fontSize: 50, fontWeight: 600, margin: 10, color:'#4B494D'}, disableUnderline: true,}}
                />


                <EditablePage data = {props.data} />

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
        color: theme.palette.text.secondary,
    },
}));

export default DocumentApp;
