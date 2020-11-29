import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, useParams} from "react-router-dom";
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
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
import firebase from "./feed";
import {Editor, EditorState,RichUtils} from 'draft-js';
import {convertFromRaw, convertToRaw} from 'draft-js';

import 'draft-js/dist/Draft.css';

export default function Feedbox(props) {
    let {id} = useParams();
    console.log(id);
    const [switchState, setSwitch] = React.useState(false);
    const [successSubmit, setSuccess] = React.useState(false);
    const [feedback, setFeedback] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [myTopics, setMyTopics] = React.useState([]);
    const [user, setUser] = React.useState({name: null, img_url_Profile: {imgURL:null}, welcome: null})
    const [feedBoxxEmail, setFeedBoxxEmail] = React.useState('');
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty(),
    );

    const [contentState, setContentState] = React.useState(() =>
        null
    );

    const [error, setError] = React.useState('');
    const handleSwitch = (event) => {
        setSwitch(!switchState);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            console.log(contentState)
            console.log('submitting' + feedback + id);
            //write to store
            const res = db.collection('feedback').add({
                url: id,
                anon: switchState,
                email: email,
                subject: subject,
                feedback: contentState,
                timeStamp: moment().format(),
            });

            setSuccess(true);
            console.log('Added document with ID: ', res.id);

        } catch (error) {
            console.log(error)
            setError({error: error.message});
        }
    };

    const getFeedBoxxUser = async(id) => {
        if (typeof id === 'string'){
            id = parseInt(id)
        }
        const feedRef = db.collection('users');
        console.log(feedRef, id)
        const snapshot = await feedRef.where('url', '==', id).get();
        console.log(snapshot)
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        let feedID = null;
        snapshot.forEach(doc => {
            feedID = doc.id

        });
        setFeedBoxxEmail(feedID);
        console.log(feedID);

        db.collection("users").doc(feedID)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                setUser(doc.data())
            });

    };

    const onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        let save = JSON.stringify(convertToRaw(contentState))
        setContentState(save)
        setEditorState(editorState)

    };

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    };


    useEffect(() => {
        let urlID = null;
        if (id) {
            urlID = id
        } else {
            urlID = props.urlID
        }
        getFeedBoxxUser(urlID);
        //TODO: Pull String from URL or PROPS

    }, []);

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
                    item xs={12}
                    style = {{width: 550}}
                >
                    {(!successSubmit) ?
                        <div>
                        <Grid
                            container
                            wrap="nowrap"
                            spacing={2}
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Avatar src = {user.img_url_Profile.imgUrl} className={classes.large}/>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <p style = {{marginTop: 0, marginBottom: -5, fontWeight: 600,}}>{user.name}</p>
                                <p style={{color: '#353C49'}}> {user.welcome} </p>
                            </Grid>
                        </Grid>
                            {/*<form onSubmit={handleSubmit} noValidate>*/}
                            <Box  boxShadow={0} style = {{minHeight: 300, boxShadow: "0px 5px 20px #C8CEEB"}} borderRadius={15} className={classes.box}>
                                <TextField fullWidth placeholder="start typing.." multiline rows={11} value={subject} onChange={e => setSubject(e.target.value)} style={{marginBottom:10}} label="Subject" rowsMax={1}/>

                                <Editor placeholder="type feedback here..." handleKeyCommand={handleKeyCommand} editorState={editorState} onChange={onChange} />
                            </Box>
                            <Button
                                className={classes.submitButton}
                                variant="contained"
                                onClick={(event)=>handleSubmit(event)}
                                style={{
                                    borderRadius: 5,
                                    backgroundColor: "#3574EE",
                                }}>
                                <p style={{color: 'white', fontWeight: '600', margin: 5}}>
                                    Submit
                                </p>
                            </Button>
                        {/*</form>*/}
                        </div>
                        :
                        <div>
                        <h2> Feedback submitted! </h2>
                            <p> Want your own feedboxx? Make one for free, <Link to="/">here</Link>.
                            </p>
                        </div>
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
    },

    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },


}));



{/*<Switch*/}
{/*    style={{colorSecondary: '#3162F0',}}*/}

{/*    checked={switchState}*/}
{/*    onChange={handleSwitch}*/}
{/*    color="primary"*/}
{/*    name="checkedB"*/}

{/*    inputProps={{'aria-label': 'primary checkbox'}}*/}
{/*/>*/}
{/*{(!switchState)*/}
{/*    ?*/}
{/*    <p style={{marginTop: 7, color: '#353C49'}}> Go Anonymous </p>npm install draft-js react react-dom
*/}
{/*    :*/}
{/*    <p style={{marginTop: 7, color: '#3162F0'}}> Your Anonymous </p>*/}
{/*}*/}





{/*<FormGroup className={classes.formGroup} noValidate autoComplete="on">*/}



{/*<TextField*/}
{/*    fullWidth*/}
{/*    placeholder="start typing..."*/}
{/*    multiline*/}
{/*    rows={10}*/}
{/*    value={feedback}*/}
{/*    onChange={e => setFeedback(e.target.value)}*/}
{/*    label="Write feedback here"*/}
{/*    variant="outlined"*/}
{/*    rowsMax={8}*/}
{/*/>*/}


{/*{(feedback)*/}
{/*    ?*/}
{/*    <div style={{textAlign: 'left', padding: 0}}>*/}
{/*        <p style={{*/}
{/*            marginTop: 15,*/}
{/*            marginBottom: 0,*/}
{/*            textAlign: 'left',*/}
{/*            size: 12,*/}
{/*            color: '#353C49'*/}
{/*        }}>*/}
{/*            Leave an email to get send a prize if the recipient finds your feedback*/}
{/*            helpful*/}
{/*        </p>*/}
{/*        <p style={{marginTop: 0, textAlign: 'left', size: 12, color: '#353C49'}}>*/}
{/*            Note: Your email will only be visible if you submit non-anonymously.*/}
{/*        </p>*/}

{/*        <TextField*/}
{/*            placeholder="start typing..."*/}
{/*            rows={11}*/}
{/*            fullWidth*/}
{/*            type='email'*/}
{/*            value={email}*/}
{/*            onChange={e => setEmail(e.target.value)}*/}
{/*            style={{marginTop: 10}}*/}
{/*            label="email address"*/}
{/*            variant="outlined"*/}
{/*            rowsMax={1}*/}
{/*        />*/}
{/*    </div>*/}
{/*    : null*/}
{/*}*/}

{/*</FormGroup>*/}
