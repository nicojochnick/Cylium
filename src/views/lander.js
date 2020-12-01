import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField/TextField";
import {convertToRaw, Editor, EditorState, RichUtils} from "draft-js";
import {db} from "../api/firebase";
import Divider from "@material-ui/core/Divider";
import mscott from "../assets/images/mscott.png";
import email_feedboxx from "../assets/images/email_feedboxx.png"
import Url from "../components/URL"
import { BsCheck } from "react-icons/bs";
import 'draft-js/dist/Draft.css';

import profileIllustration from "../assets/images/profileIllustration.png"
const MAX_LENGTH = 1500;


function Lander(props) {

    const [feedback, setFeedback] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [myTopics, setMyTopics] = React.useState([]);
    const [user, setUser] = React.useState({name: "Amy (Product Manager)", img_url_Profile: {imgURL:null}, welcome: "How can I better serve you?"})
    const [feedBoxxEmail, setFeedBoxxEmail] = React.useState('');
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty(),
    );
    const [contentState, setContentState] = React.useState(() =>
        null
    );

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

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    const handleSubmit = async (event) => {
      console.log('update state')
    };

    const onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        let save = JSON.stringify(convertToRaw(contentState))
        setContentState(save)
        setEditorState(editorState)

    };

    const classes = useStyles();
    const _handleBeforeInput = () => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = _getLengthOfSelectedText();

        if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
            console.log('you can type max ten characters');

            return 'handled';
        }
    }

    const _handlePastedText = (pastedText) => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = _getLengthOfSelectedText();

        if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
            console.log('you can type max ten characters');

            return 'handled';
        }
    };

    return (
        <div className={classes.root}>
        <Grid container style = {{padding: 20}} spacing={3}>
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  item xs={12} sm={6}>
                <Box style = {{padding: 20, paddingLeft: 50}}>
                    <p style = {{fontSize: 68, fontWeight: 600, marginTop: -50, marginBottom: 20, color:"#10102F"}}> Get more feedback, using one link</p>
                    <p style = {{fontSize: 20, fontWeight: 400, margin: 10, color:"#10102F"}}>Source feedback effortlessly from your colleagues, clients and customers from a single link in your email signature.</p>
                    <Link to={`/signup`} style={{ textDecoration: 'none' }}>
                        <Button  variant="contained" noWrap style={{
                            borderRadius: 5,
                            margin: 0,
                            marginTop: 20,
                            marginBottom: 10,
                            backgroundColor: '#4D6DF1',
                        }}>
                            <p style = {{color: 'white', fontSize: 17, margin: 2, marginRight: 25, marginLeft: 25,fontWeight: 800}}>
                                Create My Feedboxx
                            </p>
                        </Button>
                    </Link>
                    <Grid justify = "flex-start" alignItems='center' direction = "row" container>
                    <BsCheck size = {18} />
                    <p style = {{fontSize: 16, fontWeight: 400, margin: 10, color:"#10102F"}}>Takes 2 minutes</p>
                </Grid>
                    <Grid style = {{marginTop: -10,}}justify = "flex-start" alignItems='center' direction = "row" container>
                        <BsCheck size = {18} />
                        <p style = {{fontSize: 16, fontWeight: 400, margin: 10, color:"#10102F"}}>No credit card required</p>
                    </Grid>
                </Box>
            </Grid>
            <Grid
                direction="column"
                justify="center"
                alignItems="center"
                container xs={12} sm={6}>

                <Grid
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                    style = {{maxWidth: 500, margin: 60, marginTop: 80,}}
                >
                    <Grid justify="flex-start"
                          alignItems="center" container direction = "row">
                        <img style = {{height: 40, marginTop: 0}} src = {email_feedboxx}/>

                        <p style ={{color: '#8B8FA0', marginLeft: 5}}> Ideas for how I could be more helpful? Let me know {" "} </p>
                        <p style = {{color:"#4D6DF1", marginLeft: 3}}>here</p>
                    {/*<Url noShare={true} url={'amy'} />*/}
                    </Grid>

                    <Divider style = {{marginBottom: 40}}/>
                    <Grid
                        container
                        wrap="nowrap"
                        spacing={2}
                        justify="center"
                        alignItems="center"
                    >


                        <Grid style = {{marginLeft: 10}} item>
                            <Box border = {2} borderColor = {'#10102F'} borderRadius = {50}>
                            <Avatar  src = {mscott} className={classes.large}/>
                            </Box>

                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <p style = {{marginTop: 0, marginBottom: -9, color: "#10102F", fontWeight: 600,}}>{user.name}</p>
                            <p style={{color: '#353C49'}}> {user.welcome} </p>
                        </Grid>
                    </Grid>
                    {/*<form onSubmit={handleSubmit} noValidate>*/}
                    <Box boxShadow={0} style = {{minHeight: 280, marginTop: 12, minWidth: 500, maxHeight: 400,boxShadow: "0px 10px 20px #BBC2E0"}} borderRadius={20} className={classes.box}>
                        <div className={classes.draft}>
                            {/*<TextField fullWidth placeholder="start typing.."*/}
                            {/*           multiline rows={11}*/}
                            {/*           value={subject}*/}
                            {/*           onChange={e => setSubject(e.target.value)}*/}
                            {/*           style={{marginBottom:20}} label="What is your feedback about?"*/}
                            {/*           rowsMax={1}/>*/}

                            <div style = {{ marginRight: -10}}>

                                <Editor
                                    placeholder="Type feedback here..."
                                    handleKeyCommand={handleKeyCommand}
                                    editorState={editorState}
                                    onChange={onChange}
                                    handleBeforeInput={_handleBeforeInput}
                                    handlePastedText={_handlePastedText}
                                />
                            </div>
                        </div>
                    </Box>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                    <Button
                        className={classes.submitButton}
                        variant="contained"
                        onClick={(event)=>handleSubmit(event)}
                        style={{
                            marginLeft: 10,
                            marginTop: 0,
                            borderRadius: 10,
                            backgroundColor: "#10102F",
                        }}>
                        <p style={{color: 'white', fontWeight: '600', marginRight: 20, marginLeft: 20, margin: 4}}>
                            SEND FEEDBACK
                        </p>
                    </Button>
                    </Grid>

            </Grid>
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
    box: {
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

    draft:{
        overflow: "auto",
        maxHeight: 400,
        padding: 25
    },

    submitButton: {
        margin: 10,
    },

    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export default Lander;
