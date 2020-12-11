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
import boxx from "../assets/images/boxx.png"
import { HiOutlineMail,HiOutlineTrendingUp } from "react-icons/hi";


import Url from "../components/Share/URL"
import { BsCheck } from "react-icons/bs";
import 'draft-js/dist/Draft.css';
import pulse from "../assets/images/pulse.gif"

import profileIllustration from "../assets/images/profileIllustration.png"
import Popover from "@material-ui/core/Popover/Popover";
import ButtonGroup from "@material-ui/core/ButtonGroup";
const MAX_LENGTH = 1500;

let prefill = ''; //Prefill the feedback box with some feedback. You want to have a full example.


function Lander(props) {

    const [feedback, setFeedback] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isConfirming, setIsConfirming] = React.useState(false);
    const [anchorElReward, setAnchorElReward] = React.useState(null);
    const [openConfirm, setOpenConfirm] = React.useState(true);
    const [myTopics, setMyTopics] = React.useState([]);
    const [user, setUser] = React.useState({
        name: "Angela | Client",
        img_url_Profile: {imgURL:null},
        welcome: "While I love the new features, I wish it was easier to navigate through the app. I'm constantly switching between views."})
    const [feedBoxxEmail, setFeedBoxxEmail] = React.useState('');
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty(),
    );
    const handleClickReward = (event) => {
        setAnchorElReward(event.currentTarget);
    };
    const handleCloseReward = () => {
        setAnchorElReward(null);
    };
    const handleSendReward = (email, amount) => {
        console.log('yike')
    };
    const openReward = Boolean(anchorElReward);
    const idReward = openReward ? 'simple-popover-re' : undefined;

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
        let save = JSON.stringify(convertToRaw(contentState));
        setContentState(save);
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
    return (
        <div className={classes.root}>
        <Grid container style = {{padding: 10,}} spacing={2}>
            <Grid container
                  style = {{height: '80vh',}}
                  direction="column"
                  justify="center"
                  alignItems="center"
                  item xs={12} sm={6}>
                <Box style = {{padding: 20, paddingLeft: 50}}>
                    {/*<img style = {{height: 100, margin: 0, marginLeft: 0}} src = {pulse} />*/}
                    <p style = {{fontSize: 60, fontWeight: 600, marginTop: 0, marginBottom: 20, color:"#10102F"}}> Every email is a chance for feedback</p>
                    <p style = {{fontSize: 20, fontWeight: 400, margin: 10, color:"#10102F"}}> Source and reward feedback from customers, clients and colleagues using a link in your email signature</p>
                    <Link to={`/signup`} style={{ textDecoration: 'none' }}>
                        <Button  variant="contained" noWrap style={{
                            borderRadius: 5, margin: 0, marginTop: 20, marginRight: 20, marginBottom: 10, backgroundColor: '#4D6DF1',
                        }}>
                            <p style = {{color: 'white', fontSize: 17, margin: 2, marginRight: 25, marginLeft: 25,fontWeight: 800}}>
                                Get Started
                            </p>
                        </Button>
                        {/*<Button  variant="contained" noWrap style={{*/}
                        {/*    borderRadius: 5, margin: 0, marginTop: 20, marginRight: 20, marginBottom: 10, backgroundColor: "#10102F",*/}
                        {/*}}>*/}
                        {/*    <p style = {{color: 'white', fontSize: 17, margin: 2, marginRight: 25, marginLeft: 25,fontWeight: 800}}>*/}
                        {/*        Get Paid*/}
                        {/*    </p>*/}
                        {/*</Button>*/}
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
                container xs={12} sm={6}
            >
                <Box border = {2} borderColor = {"#4D6DF1"}  borderRadius = {10} style = {{ boxShadow: "0px 5px 15px #D7D7DA", margin: 35, maxWidth:500}}>
                    <Grid spacing = {0} container style = {{margin: 20, marginTop: 10}} direction = "column" >
                        <Grid container justify='flex-start' alignItems='center' direction = "row">
                        <p style = {{fontSize: 23, fontWeight: 600, marginBottom: 15, color:"#10102F"}} >Step 1. Source</p>
                            <HiOutlineMail style = {{marginLeft: 5, marginTop: 7, }} size = {28}  />
                        </Grid>
                        <p style ={{color: '#8B8FA0', margin: 0, fontSize: 17}}> ....</p>
                        <p style ={{color: '#8B8FA0',margin: 0,  fontSize: 17 }}> Mark Anderson </p>
                        <p style ={{color: '#8B8FA0',margin: 0, fontSize: 17}}> Product Manager </p>
                        <Grid direction='row' container>
                            <p style ={{color: '#8B8FA0',margin: 0, fontSize: 17, marginRight: 1}}> {'Feedback? Share it '} </p>  <p style = {{color:"#4D6DF1",margin: 0, fontSize: 17, marginLeft: 3, }}>here</p>
                        </Grid>
                    </Grid>
                    <Divider/>

                    <div style = {{ margin: 20, marginTop: 10}}>
                        <Grid
                            wrap="nowrap"
                            spacing={2}
                            justify="center"
                            alignItems="center"
                        >
                            <Grid container justify='flex-start' alignItems='center' direction = "row">
                                {/*<img  style = {{height: 50,}} src = {boxx} />*/}
                                <p style = {{fontSize: 23, fontWeight: 600, marginBottom: 20, color:"#10102F"}} >Step 2. Reward</p>
                                <HiOutlineTrendingUp style = {{marginLeft: 5}} size = {25} />

                            </Grid>

                            <Grid justify='flex-start' alignItems='center' direction = "row" container style = {{marginLeft: 0,}}>
                                <Box border = {2} borderColor = {'#4D6DF1'} borderRadius = {50}>
                                    <Avatar  src = {mscott} className={classes.large}/>
                                </Box>
                                <p style = {{margin: 15, fontSize: 17, color: '#8B8FA0', fontWeight: 500,}}>{user.name} </p>
                            </Grid>
                            <p style={{color: '#8B8FA0', fontSize: 17, marginTop: 15}}> {user.welcome} </p>
                            </Grid>
                        <div>
                                            <Button onClick={handleClickReward} variant="contained" noWrap style={{
                                                borderRadius: 5,
                                                margin: 0,
                                                marginRight: 0,
                                                backgroundColor: '#4D6DF1',

                                            }}>
                                                <p style={{color: 'white', margin: 3, fontWeight: 600}}>
                                                    Send Reward
                                                </p>
                                            </Button>
                                            <Popover
                                                style={{marginLeft: 15}}
                                                id={idReward}
                                                open={openReward}
                                                anchorEl={anchorElReward}
                                                onClose={handleCloseReward}
                                                anchorOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'center',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <ButtonGroup
                                                    orientation="vertical"
                                                    color="primary"
                                                    aria-label="vertical contained primary button group"
                                                    variant="contained"
                                                >
                                                    <Button onClick={() => handleSendReward('', 10)}
                                                            style={{backgroundColor: "#AEAEF7"}}> Send 10 Points
                                                        ($1)</Button>
                                                    <Button onClick={() => handleSendReward('', 25)}
                                                            style={{backgroundColor: "#9393E5"}}> Send 25 Points
                                                        ($2.5)</Button>
                                                    <Button onClick={() => handleSendReward('', 50)}
                                                            style={{backgroundColor: "#7676E1"}}> Send 50 Points
                                                        ($5)</Button>
                                                    <Button onClick={() => handleSendReward('', 100)}
                                                            style={{backgroundColor: "#5B5BDD"}}> Send 100 Points
                                                        ($10)</Button>
                                                    <Button onClick={() => handleSendReward('', 200)}
                                                            style={{backgroundColor: "#4545DF"}}> Send 200 Points
                                                        3($20)</Button>
                                                </ButtonGroup>
                                            </Popover>
                                        </div>
                    </div>


                </Box>
            </Grid>
        </Grid>
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,

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
        padding: 10,
    },

    submitButton: {
        margin: 10,
    },

    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
}));

export default Lander;

{/*<Editor*/}
{/*    placeholder="Type feedback here..."*/}
{/*    handleKeyCommand={handleKeyCommand}*/}
{/*    editorState={editorState}*/}
{/*    onChange={onChange}*/}
{/*    handleBeforeInput={_handleBeforeInput}*/}
{/*    handlePastedText={_handlePastedText}*/}
{/*/>*/}




{/*<Button*/}
{/*    className={classes.submitButton}*/}
{/*    variant="contained"*/}
{/*    onClick={(event)=>handleSubmit(event)}*/}
{/*    style={{*/}
{/*        marginLeft: 10,*/}
{/*        marginTop: 0,*/}
{/*        borderRadius: 10,*/}
{/*        backgroundColor: "#10102F",*/}
{/*    }}>*/}
{/*    <p style={{color: 'white', fontWeight: '600', marginRight: 20, marginLeft: 20, margin: 4}}>*/}
{/*        SEND*/}
{/*    </p>*/}
{/*</Button>*/}


{/*<Grid*/}
{/*    direction="row"*/}
{/*    justify="flex-end"*/}
{/*    alignItems="flex-end"*/}
{/*    style = {{margin: 30, marginTop: 10,}}*/}
{/*>*/}
{/*    <Grid justify="flex-start"*/}
{/*          alignItems="flex-start" container direction = "column">*/}
{/*        <p style = {{marginBottom: 10, fontSize: 19, color: "#10102F", fontWeight: 600,}}> Step 1: Sign up to create a unique feedback url for yourself or for your product/service</p>*/}
{/*        <Grid container alignItems = "center" style = {{marginTop: 10, marginLeft: 0}}>*/}
{/*            <Url big = {true} url = {'amy'} noShare = {true}/>*/}
{/*        </Grid>*/}
{/*        /!*<Url noShare={true} url={'amy'} />*!/*/}
{/*    </Grid>*/}
{/*    /!*<Divider style = {{marginBottom: 20}}/>*!/*/}
{/*    <Grid justify="flex-start"*/}
{/*          alignItems="center" container direction = "row">*/}
{/*        <p style = {{marginBottom: 10, fontSize: 19, color: "#10102F", fontWeight: 600,}}> Step 2: Add your url anywhere, including a work email signature or website</p>*/}

{/*        <Box*/}
{/*            flexWrap="wrap"*/}
{/*            border = {1}*/}
{/*            borderColor = {"#4D6DF1"}*/}
{/*            style = {{ flexGrow: 1, backgroundColor:"white", margin: 4, borderRadius: 13, padding: 5, minWidth: 150}}*/}
{/*            className={classes.container}>*/}
{/*            <Grid spacing = {0} container style = {{marginLeft: 5, marginBottom: 10}} direction = "column" >*/}
{/*                <p style ={{color: '#8B8FA0', margin: 0, fontSize: 16}}> ....</p>*/}
{/*                <p style ={{color: '#8B8FA0',margin: 0,  fontSize: 16 }}> Amy Reed  </p>*/}
{/*                <p style ={{color: '#8B8FA0',margin: 0, fontSize: 16}}> Product Manager </p>*/}
{/*                <Grid direction='row' container>*/}
{/*                    <p style ={{color: '#8B8FA0',margin: 0, fontSize: 16, marginRight: 1}}> {'Feedback? Share it '} </p>  <p style = {{color:"#4D6DF1",margin: 0, fontSize: 16, marginLeft: 3, }}>here</p>*/}
{/*                </Grid>*/}
{/*            </Grid>*/}
{/*        </Box>*/}
{/*        /!*<Url noShare={true} url={'amy'} />*!/*/}
{/*    </Grid>*/}
{/*    <p style = {{marginBottom: 20, fontSize: 19, color: "#10102F", fontWeight: 600,}}> Step 3: Reward the best insights</p>*/}

{/*    <Box  border = {1} borderColor = {"#4D6DF1"} boxShadow={0}  style = {{ flexGrow: 1, backgroundColor:"white", margin: 4, borderRadius: 13, padding: 3, minWidth: 150}} borderRadius={20} className={classes.box}>*/}
{/*        <div className={classes.draft}>*/}

{/*            <div style = {{ marginRight: -10}}>*/}
{/*                <Grid*/}
{/*                    container*/}
{/*                    wrap="nowrap"*/}
{/*                    spacing={2}*/}
{/*                    justify="center"*/}
{/*                    alignItems="center"*/}
{/*                >*/}
{/*                    <Grid style = {{marginLeft: 10,}} item>*/}
{/*                        <Box border = {1} borderColor = {'#4D6DF1'} borderRadius = {50}>*/}
{/*                            <Avatar  src = {mscott} className={classes.large}/>*/}
{/*                        </Box>*/}

{/*                    </Grid>*/}
{/*                    <Grid item xs zeroMinWidth>*/}
{/*                        <p style = {{marginTop: 0, fontSize: 15, color: '#8B8FA0', fontWeight: 500,}}>{user.name} </p>*/}
{/*                    </Grid>*/}
{/*                </Grid>*/}
{/*                <p style={{color: '#8B8FA0', margin: 15}}> {user.welcome} </p>*/}
{/*                <div>*/}
{/*                    <Button onClick={handleClickReward} variant="contained" noWrap style={{*/}
{/*                        borderRadius: 5,*/}
{/*                        margin: 0,*/}
{/*                        marginRight: 0,*/}
{/*                        backgroundColor: '#4D6DF1',*/}

{/*                    }}>*/}
{/*                        <p style={{color: 'white', margin: 3, fontWeight: 600}}>*/}
{/*                            Send Reward*/}
{/*                        </p>*/}
{/*                    </Button>*/}
{/*                    <Popover*/}
{/*                        style={{marginLeft: 15}}*/}
{/*                        id={idReward}*/}
{/*                        open={openReward}*/}
{/*                        anchorEl={anchorElReward}*/}
{/*                        onClose={handleCloseReward}*/}
{/*                        anchorOrigin={{*/}
{/*                            vertical: 'center',*/}
{/*                            horizontal: 'right',*/}
{/*                        }}*/}
{/*                        transformOrigin={{*/}
{/*                            vertical: 'center',*/}
{/*                            horizontal: 'left',*/}
{/*                        }}*/}
{/*                    >*/}
{/*                        <ButtonGroup*/}
{/*                            orientation="vertical"*/}
{/*                            color="primary"*/}
{/*                            aria-label="vertical contained primary button group"*/}
{/*                            variant="contained"*/}
{/*                        >*/}
{/*                            <Button onClick={() => handleSendReward('', 10)}*/}
{/*                                    style={{backgroundColor: "#AEAEF7"}}> Send 10 Points*/}
{/*                                ($1)</Button>*/}
{/*                            <Button onClick={() => handleSendReward('', 25)}*/}
{/*                                    style={{backgroundColor: "#9393E5"}}> Send 25 Points*/}
{/*                                ($2.5)</Button>*/}
{/*                            <Button onClick={() => handleSendReward('', 50)}*/}
{/*                                    style={{backgroundColor: "#7676E1"}}> Send 50 Points*/}
{/*                                ($5)</Button>*/}
{/*                            <Button onClick={() => handleSendReward('', 100)}*/}
{/*                                    style={{backgroundColor: "#5B5BDD"}}> Send 100 Points*/}
{/*                                ($10)</Button>*/}
{/*                            <Button onClick={() => handleSendReward('', 200)}*/}
{/*                                    style={{backgroundColor: "#4545DF"}}> Send 200 Points*/}
{/*                                3($20)</Button>*/}
{/*                        </ButtonGroup>*/}
{/*                    </Popover>*/}
{/*                </div>*/}
{/*            </div>*/}
{/*        </div>*/}
{/*    </Box>*/}
{/*    <Grid*/}
{/*        container*/}
{/*        direction="row"*/}
{/*        justify="center"*/}
{/*        alignItems="center"*/}
{/*    >*/}

{/*    </Grid>*/}
{/*</Grid>*/}
