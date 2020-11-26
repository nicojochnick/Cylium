import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect,useParams} from "react-router-dom";
import Switch from '@material-ui/core/Switch';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormGroup from '@material-ui/core/FormGroup';
import {Signup} from "../helpers/auth";
import {db} from "../api/firebase";
import moment from 'moment'


export default function Feedbox(props) {
    let {id} = useParams();


    console.log(id);
    const [switchState, setSwitch] = React.useState( false);
    const [successSubmit, setSuccess] = React.useState( false);
    const [feedback, setFeedback] = React.useState('');
    const [error, setError] = React.useState('');
    const handleSwitch = (event) => {
        setSwitch(!switchState);
    };

    const handleSubmit = (event)=> {
        event.preventDefault();
        try {
            console.log('submitting' + feedback + id)
            //write to store
            const res = db.collection('feedback').add({
                url: id,
                feedback: feedback,
                timeStamp:moment().format(),
            });

            console.log('Added document with ID: ', res.id);


        } catch (error) {
            console.log(error)
            setError({ error: error.message });
        }
    };


    const classes = useStyles();
    return (
        <div className={classes.root}>
        <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '90vh' }}
        >
            <Grid
                direction="column"
                alignItems="center"
                justify="center"
                item xs={12}>
                <h1 className="display-4"> Welcome to Nico's FeedBoxx </h1>
                <p> Feel free to leave any kind of feedback. However, here is what I'm most looking for: </p>
                <ul>
                    <li>
                        <p> communication style </p>
                    </li>
                    <li>
                        <p>clarity and correctness of my writing</p>
                    </li>
                    <li>
                        <p> being a team player </p>
                    </li>

                </ul>

                <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit} noValidate >
                        <Grid container direction ="row">
                        <p> go anonymous </p>
                        <Switch
                            checked={switchState}
                            onChange={handleSwitch}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        </Grid>
                    <FormGroup className={classes.formGroup} noValidate autoComplete="on">
                    <TextField
                        placeholder="start typing..."
                        multiline
                        rows={10}
                        value = {feedback}
                        onChange = {e => setFeedback(e.target.value)}
                        style = {{width:500}}
                        label="leave feedback here"
                        variant="outlined"
                        rowsMax={10}
                    />

                        <Button
                            className={classes.submitButton}
                            variant="contained"
                            color="primary"
                            type = 'submit'
                        >

                            Submit

                        </Button>
                    </FormGroup>
                    </form>
                </Paper>
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
        margin: 10,
    },
    formGroup: {
        alignItems: 'center'
    },

    submitButton: {
        margin: 20,

    }


}));



