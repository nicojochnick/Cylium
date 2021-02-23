import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles, fade,} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import nextId from "react-id-generator";
import Menu from '@material-ui/core/Menu';
import 'emoji-mart/css/emoji-mart.css'
import {TwitterPicker} from "react-color";
import TyperTracker from "../Typers/typerTracker";
import EditQuestionItem from "./editQuestionItem";
import List from '@material-ui/core/List';
import { BiSend, BiPlus } from "react-icons/bi";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import EditTeamMemberItem from "./editTeamMemberItem";
import UserProfile from "../User/userProfile";
import SearchUsers from "./searchUsers";
import {db} from '../../api/firebase'
import firebase from "firebase/app";
import AutomationDataEditor from "./automationDataEditor";
import AutomationRecurrenceEditor from "./automationRecurrence/automationRecurrenceEditor";



function AutomationRecipients(props) {
    const classes = useStyles();
    const [tracker, setTracker] = React.useState(props.tracker);
    const [title, setTitle] = React.useState(props.tracker.trackerName);
    const [backgroundColor, setBackgroundColor] = React.useState('white');
    const [checked, setChecked] = React.useState([1]);
    const [value, setValue] = React.useState('female');
    const handleTitleChange= (name) => {setTitle(name)};
    const handleChangeComplete = (color) => {setBackgroundColor(color.hex )};


    // const admin = require('firebase-admin');
    const addQuestion = async() => {
        let id =  nextId();
        let newCall = {
            callID: id,
            label: 'type your question here...',
            order: id,
            receivers: [],
            type: 'text',
            timeStamp: new Date(),
        };
        const trackRef = await db.collection('trackers').doc(props.tracker.id)
        const addCall = await trackRef.update({
            call: firebase.firestore.FieldValue.arrayUnion(newCall)
        })
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const getTracker = async(tracker_id) => {
        await db.collection("trackers").doc(tracker_id)
            .onSnapshot(function(doc) {
                let updateTracker = doc.data();
                console.log(updateTracker)
                if (updateTracker) {
                    setTracker(updateTracker);
                }
            });

    };

    useEffect(() => {
        getTracker(tracker.id);
    }, []);

    // console.log(tracker)

    return (
        <div className={classes.root}>
            <Grid  direction = 'column' container>

                <Divider orientation="vertical" flexItem />

                <Grid xs={12} item direction={'column'}>

                    <Box>
                        <SearchUsers user = {props.user} />
                            <Divider/>
                                <List dense className={classes.root}>
                                    {props.user.friendList.map((value) => {
                                        return (
                                           <EditTeamMemberItem
                                               user = {value}
                                               flat = {true}
                                               withSelect = {false}
                                               value = {value}
                                               handleToggle = {handleToggle}
                                               checked = {checked} />
                                        );
                                    })}
                                </List>
                    </Box>
                </Grid>
                <Grid item  >

                </Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0,
        margin: 0,
        // maxHeight: 200,
        // overflow: 'hidden'
        // maxWidth: 540,
        // backgroundColor: 'white',
    },
    box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        flexDirection: 'column',
        // margin: 10,
        // marginBottom: 20,
    },

    textroot: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },



    inner_box:{
        flexGrow: 1,
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    boxSticky:{
        padding: 0,
        top: "0rem",
        position: "sticky",
        display: 'start',
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

    search: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: fade("#A8ADBC", 0.15),
        '&:hover': {
            backgroundColor: fade("#A8ADBC", 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    search2: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: fade("#A8ADBC", 0.15),
        '&:hover': {
            backgroundColor: fade("#A8ADBC", 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '75%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default AutomationRecipients;



{/*<TextField*/}
{/*    onChange={e => handleTitleChange(e.target.value)}*/}
{/*    id="filled-basic"*/}
{/*    label="Title"*/}
{/*    placeholder='Add a Title'*/}
{/*    fullWidth*/}
{/*    variant="outlined"*/}
{/*    value = {title}*/}
{/*    style = {{marginBottom: 10}}*/}

{/*/>*/}





{/*<Grid xs={12} item>*/}

{/*    <Divider/>*/}
{/*</Grid>*/}

{/*<Grid xs={5}  item>*/}
{/*    <Box>*/}
{/*        <p style = {{margin: 10, fontWeight: 500,}}>*/}
{/*            Data*/}
{/*        </p>*/}
{/*        <Divider/>*/}

{/*        <Grid style = {{margin: 20}} item xs={12} md = {12} lg = {12} >*/}
{/*            <AutomationDataEditor addQuestion = {addQuestion} user = {props.user} tracker = {props.tracker}/>*/}
{/*        </Grid>*/}
{/*    </Box>*/}
{/*</Grid>*/}
