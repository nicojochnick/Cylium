import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles, fade,} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import Switch from "@material-ui/core/Switch/Switch";
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import 'emoji-mart/css/emoji-mart.css'
import {TwitterPicker} from "react-color";
import TyperTracker from "../Typers/typerTracker";
import EditQuestionItem from "./editQuestionItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { BiSend, BiPlus } from "react-icons/bi";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import EditTeamMemberItem from "./editTeamMemberItem";
import UserProfile from "../User/userProfile";
import SearchUsers from "./searchUsers";
import {db} from '../../api/firebase'
import firebase from "firebase/app";




function TrackerManager(props) {
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

        let newCall = {
            callID: 'noID',
            label: 'nolabel',
            order: 3,
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

    console.log(tracker)

    return (
        <div className={classes.root}>
            <Grid  direction = 'column' container>
                <Grid item>
                    <Box style = {{margin: 20, }}>
                        <Grid  style = {{marginTop: 20}}  spacing={2} container direction = 'row'>
                            <Grid  spacing={3} item xs={6} md = {6} lg = {6} >
                                <Box style = {{marginTop: 0}} >
                                    {props.user
                                        ?<UserProfile user={props.user}/>
                                        : null
                                    }
                                    <Grid container space = {2} direction = 'row'>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid
                                alignItems='center'
                                justify = 'center'
                                item xs={6}
                                md = {6}
                                lg = {6}>
                                <Box
                                    display = 'flex'
                                    alignItems = 'start'
                                    justifyContent="center"
                                    style = {{marginTop: -5}}>
                                    <TwitterPicker
                                        color={ backgroundColor}
                                        onChangeComplete={ handleChangeComplete }
                                    />
                                </Box>
                                    </Grid>
                                    <Grid spacing={3} item xs={6} >
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
                        <Grid spacing={3} container direction = 'row'>
                           <SearchUsers user = {props.user} />
                            <Grid  item xs={12} md = {6} lg = {6} >
                                <List dense className={classes.root}>
                                    {props.user.friendList.map((value) => {
                                        return (
                                           <EditTeamMemberItem
                                               user = {value}
                                               withSelect = {false}
                                               value = {value}
                                               handleToggle = {handleToggle}
                                               checked = {checked} />
                                        );
                                    })}
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider/>
                </Grid>
                <Grid item>
                    <Box style = {{margin: 20, marginTop: -10}}>
                        <Grid spacing={3} container direction = 'row'>
                            <Grid  item xs={12} md = {12} lg = {12} >
                                <p>
                                    Questions
                                </p>
                        {(tracker.call)
                            ?
                            <div>
                                {Object.keys(tracker.call).map((item) =>
                                    <EditQuestionItem
                                        item = {item}
                                        user = {props.user}
                                        tracker = {tracker}
                                    />
                                )}
                            </div>
                            : null
                        }
                        <Button
                            style = {{margin: 10}}
                            variant="contained"
                            color = 'primary'
                            className={classes.button}
                            startIcon={<BiPlus />}
                            onClick={()=>addQuestion()}
                        >
                            Add Question
                        </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // maxWidth: 540,
        backgroundColor: 'white',
    },
    box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        flexDirection: 'column',
        // margin: 10,
        // marginBottom: 20,
        backgroundColor: 'white',
    },

    inner_box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
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


export default TrackerManager;



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
