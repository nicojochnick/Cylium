import React from 'react';
import Url from "../components/URL";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch/Switch";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Divider from "@material-ui/core/Divider";
import {BsX,BsPlus} from "react-icons/bs";
import Feedbox from "../views/feedbox"
import Feedback from "../components/feedback";
import AllTopics from "../components/Topics/allTopics";
import {db} from "../api/firebase";
import moment from "./feedbox";

//

function EditFeedbox(props) {
    const classes = useStyles();
    const [switchState, setSwitch] = React.useState( false);
    const [successSubmit, setSuccess] = React.useState( false);
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [welcome, setWelcomeMessage] = React.useState('');
    const [profileImage, setProfileImage] = React.useState('');

    const handleSwitch = (event) => {
        setSwitch(!switchState);
    };

    const handleSave = (event) => {
        //TODO: send data to firestore
        event.preventDefault();
        try {
            //write to store
            const res = db.collection('users').doc(props.email).set({
                name: name,
                welcome: welcome,
                url: props.url,
                img: profileImage,
            });

            setSuccess(true);

        } catch (error) {
            console.log(error);
            setError({error: error.message});
        }
    };

    const handleNameChange= (name) => {
        setName(name)
    };

    const handleWelcomeChange= (message) => {
        setWelcomeMessage(message)
    };

    const handleProfileImageChange= (event) => {
        //TODO: upload docs from computer
        let profile = null;
        setProfileImage(profile);
    };

    return (
        <Grid container component = "main" className = {classes.root}>

            <Grid item xs={4} sm={4}  style={{backgroundColor: "white"}} >
                <form onSubmit={handleSave} noValidate>

                <Box className={classes.box}>
                    <h2
                        style ={{
                            margin:15,
                            color:"#6B7280",
                            fontSize: 20,
                            fontWeight: 600
                        }}>
                        Edit Your Feedboxx
                    </h2>
                    <Divider/>
                    <Box className={classes.container}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar>W</Avatar>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <TextField
                                onChange={e => handleNameChange(e.target.value)}
                                id="filled-basic"
                                label="Name"
                                fullWidth
                                value = {name}
                            />
                        </Grid>
                    </Grid>
                    <Grid style = {{marginTop: 20}} item>
                        <TextField
                            placeholder="start typing..."
                            multiline
                            rows={10}
                            fullWidth={true}
                            onChange={e => handleWelcomeChange(e.target.value)}
                            label="Welcome message"
                            variant="outlined"
                            rowsMax={3}
                        />
                    </Grid>
                        <Grid style = {{marginTop: 20}}>
                            <Box
                                alignItems="flex-end"
                                display="flex"
                                flexDirection="row"
                                width = {1}
                            >
                                {/*<TextField*/}
                                {/*    fullWidth*/}
                                {/*    id="filled-basic"*/}
                                {/*    label="Add Feedback Category"*/}
                                {/*/>*/}
                                {/*<BsPlus style = {{marginTop: 5, color: "#3574EE"}} size = {35}/>*/}
                            </Box>
                            {/*<AllTopics topics = {categories} handleSelect = {handleSelect} handleDeselect = {handleDeselect} />*/}
                        </Grid>

                    <Button
                        className={classes.submitButton}
                        type='submit'
                        variant="contained"
                        style={{
                            marginRight: 45,
                            marginLeft: 0,
                            paddingRight: 60,
                            paddingLeft: 60,
                            borderRadius: 5,
                            backgroundColor: "#3574EE",
                        }}
                    >
                        <p style = {{color: 'white', fontWeight: '600', margin: 5}}>
                            Update
                        </p>
                    </Button>
                </Box>
                </Box>
                </form>

            </Grid>
            <Grid item xs={6} sm={8} >
            <Feedbox urlID = {props.url} />
            </Grid>
        </Grid>
    );
}


const useStyles = makeStyles((theme) => ({
    box: {
        padding: 0,
        margin: 0,
        marginBottom: 20,
        borderRadius: 5,
    },
    container:{
        margin: 20

    },
    formGroup: {
        alignItems: 'center'
    },

    submitButton: {
        margin: 10,
    },

    root: {
        height: '100vh',
        flexGrow:1
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

export default EditFeedbox;


// const handleAddCategory = (name) => {
//     let cats = categories.slice();
//     cats.push({name: name});
//     setCategories(cats)
//
// };
// const handleSelect = (item) => {
//     let topics = categories.slice();
//     topics.push(item);
//     setCategories(topics);
// };
//
// const handleDeselect = (item) => {
//     let topics = categories.slice();
//     const index = topics.indexOf(item);
//     if (index > -1) {
//         topics.splice(index, 1);
//     }
//     setCategories(topics);
// };


// let topics = [
//     {name: "Communication", checked: false,},
//     {name: "Leadership", checked: false,},
//     {name: "Writing", checked: false,},
//     {name: "Management", checked: false,},
//     {name: "Product Management", checked: false,},
//     {name: "Organization", checked: false,},
//     {name: "Strategic Thinking", checked: false,},
//     {name: "Design", checked: false,},
//     {name: "Other", checked: false,},
// ];
