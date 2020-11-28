import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, useParams} from "react-router-dom";
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
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import MyTopics from "../components/Topics/myTopics";

export default function Feedbox(props) {
    let {id} = useParams();
    console.log(id);
    const [switchState, setSwitch] = React.useState(false);
    const [successSubmit, setSuccess] = React.useState(false);
    const [feedback, setFeedback] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [myTopics, setMyTopics] = React.useState([]);

    const [error, setError] = React.useState('');
    const handleSwitch = (event) => {
        setSwitch(!switchState);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            console.log('submitting' + feedback + id)
            //write to store
            const res = db.collection('feedback').add({
                url: id,
                anon: switchState,
                email: email,
                subject: subject,
                feedback: feedback,
                timeStamp: moment().format(),
            });

            setSuccess(true);
            console.log('Added document with ID: ', res.id);

        } catch (error) {
            console.log(error)
            setError({error: error.message});
        }
    };


    const classes = useStyles();
    return (
        <Box width={1} className={classes.root}>
            <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: '90vh'}}
            >
                <Grid
                    direction="column"
                    alignItems="center"
                    justify="center"
                    item xs={12}>
                    <h1 className="display-4"> Welcome to Nico's FeedBoxx </h1>
                    <p style={{color: '#353C49'}}> Feel free to leave any kind of feedback</p>

                    {(!successSubmit) ?

                        <Box boxShadow={5} borderRadius={7} className={classes.box}>
                            <form onSubmit={handleSubmit} noValidate>
                                <Grid container direction="row">
                                    <Switch
                                        style={{colorSecondary: '#3162F0',}}

                                        checked={switchState}
                                        onChange={handleSwitch}
                                        color="primary"
                                        name="checkedB"

                                        inputProps={{'aria-label': 'primary checkbox'}}
                                    />
                                    {(!switchState)
                                        ?
                                        <p style={{marginTop: 7, color: '#353C49'}}> Go Anonymous </p>
                                        :
                                        <p style={{marginTop: 7, color: '#3162F0'}}> Your Anonymous </p>
                                    }
                                </Grid>
                                <Divider style={{marginTop: 10, marginBottom: 20}}/>
                                <FormGroup className={classes.formGroup} noValidate autoComplete="on">
                                    <MyTopics myTopics={myTopics} style={{marginBottom: 20}}/>

                                    {/*<TextField*/}
                                    {/*    fullWidth*/}
                                    {/*    placeholder="start typing.."*/}
                                    {/*    multiline*/}
                                    {/*    rows={11}*/}
                                    {/*    value={subject}*/}
                                    {/*    onChange={e => setSubject(e.target.value)}*/}
                                    {/*    style={{marginBottom:10}}*/}
                                    {/*    label="add a subject line"*/}
                                    {/*    variant="outlined"*/}
                                    {/*    rowsMax={1}*/}
                                    {/*/>*/}

                                    <TextField
                                        fullWidth
                                        placeholder="start typing..."
                                        multiline
                                        rows={10}
                                        value={feedback}
                                        onChange={e => setFeedback(e.target.value)}
                                        label="leave feedback here"
                                        variant="outlined"
                                        rowsMax={8}
                                    />
                                    {(feedback)
                                        ?
                                        <div style={{textAlign: 'left', padding: 0}}>
                                            <p style={{
                                                marginTop: 15,
                                                marginBottom: 0,
                                                textAlign: 'left',
                                                size: 12,
                                                color: '#353C49'
                                            }}>
                                                Leave an email to get send a prize if the recipient finds your feedback
                                                helpful
                                            </p>
                                            <p style={{marginTop: 0, textAlign: 'left', size: 12, color: '#353C49'}}>
                                                Note: Your email will only be visible if you submit non-anonymously.
                                            </p>

                                            <TextField
                                                placeholder="start typing..."
                                                rows={11}
                                                fullWidth
                                                type='email'
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                style={{marginTop: 10}}
                                                label="email address"
                                                variant="outlined"
                                                rowsMax={1}
                                            />
                                        </div>
                                        : null
                                    }
                                    <Button
                                        className={classes.submitButton}
                                        variant="contained"
                                        type='submit'
                                        style={{
                                            borderRadius: 5,
                                            backgroundColor: "#3574EE",
                                        }}>

                                        <p style={{color: 'white', fontWeight: '600', margin: 5}}>

                                            Submit
                                        </p>

                                    </Button>
                                </FormGroup>
                            </form>
                        </Box>
                        : <h2> Feedback submitted! </h2>
                    }
                </Grid>
            </Grid>
        </Box>
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
    box: {
        padding: 15,
        // display: 'start',
        // overflow: 'auto',
        // flexDirection: 'row',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white'

    },
    formGroup: {
        alignItems: 'center'
    },

    submitButton: {
        margin: 10,
    }


}));



