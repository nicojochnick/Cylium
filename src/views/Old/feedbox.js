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
import {Signup} from "../../helpers/auth";
import {db} from "../../api/firebase";
import {auth} from "../../api/firebase"
import moment from 'moment'
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import MyTopics from "../../components/Old/Topics/myTopics";
import {Editor, EditorState,RichUtils} from 'draft-js';
import {convertFromRaw, convertToRaw} from 'draft-js';
import logo from "../../assets/images/logo.png";
import firebase from 'firebase/app';


import 'draft-js/dist/Draft.css';
import Container from "@material-ui/core/Container";
const MAX_LENGTH = 1500;

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
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty(),);
    const [contentState, setContentState] = React.useState(() => null);
    const [error, setError] = React.useState('');
    const [viewerEmail, setViewerEmail] = React.useState(null);
    const [viewerUser, setViewerUser] = React.useState(null);
    const [withConfirm, setWithConfirm] = React.useState(false);
    const [allConfirm, setAllConfirm] = React.useState(false);


    const handleSwitch = (event) => {
        setSwitch(!switchState);
    };

    const handleSubmit = async (event) => {

        if (viewerUser || withConfirm) {
            event.preventDefault();
            try {
                console.log(contentState)
                console.log('submitting' + feedback + id);
                //write to store
                const res = await db.collection('feedback').add({
                    url: id,
                    anon: switchState,
                    email: viewerEmail,
                    subject: subject,
                    feedback: contentState,
                    thanked: false,
                    timeStamp: new Date()
                });
                db.collection('feedback').doc(res.id).update({
                    id: res.id
                });

                setSuccess(true);
                console.log('Added document with ID: ', res.id);

            } catch (error) {
                console.log(error)
                setError({error: error.message});
            }
        } else {
            setWithConfirm(true)
        }
    };

    const getFeedBoxxUser = async(id) => {
        if (typeof id === 'string'){
            id = parseInt(id)
        }
        const feedRef = db.collection('users');
        const snapshot = await feedRef.where('url', '==', id).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        let feedID = null;
        snapshot.forEach(doc => {
            feedID = doc.id
        });
        setFeedBoxxEmail(feedID);
        db.collection("users").doc(feedID)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                setUser(doc.data())
            });
    };

    const getViewerUser = async() => {
        let user = firebase.auth().currentUser;
        if (user) {
            let email = await firebase.auth().currentUser.email;
            setViewerEmail(email);
            console.log(email);
            await db.collection("users").doc(email)
                .onSnapshot(function(doc) {
                    if (doc.data()) {
                        setViewerUser(doc.data())
                    }
                });
        }
    };

    const onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        let save = JSON.stringify(convertToRaw(contentState));
        setContentState(save);
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
        getViewerUser();

    }, []);

    const classes = useStyles();

    const _handleBeforeInput = () => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = _getLengthOfSelectedText();

        if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
            console.log('you can type max ten characters');

            return 'handled';
        }
    };

    const _handlePastedText = (pastedText) => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = _getLengthOfSelectedText();

        if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
            console.log('you can type max ten characters');

            return 'handled';
        }
    };

    const _getLengthOfSelectedText = () => {
        const currentSelection = editorState.getSelection();
        const isCollapsed = currentSelection.isCollapsed()
        let length = 0;

        if (!isCollapsed) {
            const currentContent = editorState.getCurrentContent();
            const startKey = currentSelection.getStartKey();
            const endKey = currentSelection.getEndKey();
            const startBlock = currentContent.getBlockForKey(startKey);
            const isStartAndEndBlockAreTheSame = startKey === endKey;
            const startBlockTextLength = startBlock.getLength();
            const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
            const endSelectedTextLength = currentSelection.getEndOffset();
            const keyAfterEnd = currentContent.getKeyAfter(endKey);
            console.log(currentSelection)
            if (isStartAndEndBlockAreTheSame) {
                length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
            } else {
                let currentKey = startKey;

                while (currentKey && currentKey !== keyAfterEnd) {
                    if (currentKey === startKey) {
                        length += startSelectedTextLength + 1;
                    } else if (currentKey === endKey) {
                        length += endSelectedTextLength;
                    } else {
                        length += currentContent.getBlockForKey(currentKey).getLength() + 1;
                    }

                    currentKey = currentContent.getKeyAfter(currentKey);
                };
            }
        }

        return length;
    };

    return (
        <Box className={classes.root}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: '99vh'}}
                overflow = 'auto'
            >
                <Container component="main" maxWidth='sm'>
                <Grid
                    direction="column"
                    alignItems="center"
                    justify="center"
                    item xs={12}
                >
                    {(!successSubmit) ?
                        <div>


                            <Grid
                            container
                            wrap="nowrap"
                            spacing={1}
                            justify="center"
                            style = {{paddingTop: 40}}
                            alignItems="flex-start"
                        >
                            <Grid style = {{marginBottom: 15}} item>
                                <Box border = {2} borderColor = {'#4D6DF1'} borderRadius = {50}>
                                <Avatar src = {user.img_url_Profile.imgUrl} className={classes.large}/>
                                </Box>
                            </Grid>
                            <Grid item xs zeroMinWidth style = {{marginLeft:10}}>
                                <p style = {{marginTop: 0, marginBottom: -13, color: "#10102F", fontWeight: 600,}}>{user.name}</p>
                                <p style={{color: '#353C49', fontSize: 17}}> {user.welcome} </p>
                            </Grid>
                        </Grid>
                            {/*<form onSubmit={handleSubmit} noValidate>*/}
                            <Box boxShadow={0}
                                 width={1}
                                 style = {{minHeight: 400, marginTop: 15, boxShadow: "0px 10px 20px #BBC2E0"}}
                                 borderRadius={20}
                                 className={classes.box}>
                                <Grid container direction = "row" alignItems='center' justify = "flex-start">
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
                                        <p style={{marginTop: 12, color: '#353C49'}}> Not Anonymous </p>
                                        :
                                        <p style={{marginTop:12, color: '#3162F0'}}> Anonymous </p>
                                    }
                                </Grid>

                                <div className={classes.draft}>
                                <TextField fullWidth placeholder="start typing.."
                                           multiline rows={11}
                                           value={subject}
                                           onChange={e => setSubject(e.target.value)}
                                           style={{marginBottom:20}} label="Subject"
                                           rowsMax={1}/>

                                           <div style = {{ }}>

                                <Editor
                                    placeholder="type feedback here..."
                                    handleKeyCommand={handleKeyCommand}
                                    editorState={editorState}
                                    onChange={onChange}
                                    handleBeforeInput={_handleBeforeInput}
                                    handlePastedText={_handlePastedText}
                                />
                                           </div>
                                </div>
                            </Box>
                            { (viewerUser)
                                ? null
                                :
                                <div>
                                    {(withConfirm)
                                       ?<div>
                                        <p style={{textAlign: "center", margin: 8}}> Leave an email to receive a reward for this feedback. If you're anonymous, your email will not be
                                            shown to the recipient.</p>
                                        < TextField
                                        placeholder="start typing..."
                                        rows={11}
                                        type='email'
                                        fullWidth
                                        value={viewerEmail}
                                        onChange={e => setViewerEmail(e.target.value)}
                                        style={{margin: 10, marginRight: 20, marginTop: 5}}
                                        label="email address"
                                        variant="outlined"
                                        rowsMax={1}
                                        />
                                       </div>
                                        :null
                                    }
                                </div>

                            }

                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                            <Button
                                className={classes.submitButton}
                                variant="contained"
                                fullWidth
                                onClick={(event)=>handleSubmit(event)}
                                style={{
                                    marginLeft: 10,
                                    marginTop: 0,
                                    borderRadius: 10,
                                    backgroundColor: "#4D6DF1",
                                }}>
                                <p style={{color: 'white', fontWeight: '600', marginRight: 20, marginLeft: 20, margin: 4}}>
                                    SEND Feedback
                                </p>
                            </Button>
                            </Grid>
                        {/*</form>*/}

                            <Grid container direction = "column" alignItems = 'center' justify = 'center'>
                                {(user.pointsRewarded)
                                    ? <p style = {{textAlign: "center", margin: 0, marginTop: 5, fontSize: 15, fontWeight: 500 }}>
                                        This form has rewarded ${user.pointsRewarded/10} for given feedback
                                    </p>
                                    : null
                                }
                                <img style = {{height: 40}} src = {logo} />

                            </Grid>
                        </div>
                        :
                        <div>
                        <h2> Feedback submitted! </h2>
                            <p> Want your own Feedboxx? Make one for free <Link to="/">here</Link>.
                            </p>
                            <Divider style = {{margin: 10}} />
                            <img  style = {{height: 50, margin: -10}} src = {logo} />
                        </div>
                    }

                </Grid>
                </Container>
            </Grid>
        </Box>
    );
}


const useStyles = makeStyles((theme) => ({

    root: {
        // flexGrow: 1,
        // backgroundColor: "#ECEFF3",
    },
    paper: {
        padding: theme.spacing(2),
        margin: 10,
    },
    box: {
        // display: 'start',
        // overflow: 'auto',
        // flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#FFFFFF'
    },
    formGroup: {
        alignItems: 'center'
    },

    draft:{
        overflow: "auto",
        maxHeight: 400,
        padding: 20,
        marginTop: -20,
    },

    submitButton: {
        margin: 10,
    },

    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        backgroundColor: "#10102F"
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
