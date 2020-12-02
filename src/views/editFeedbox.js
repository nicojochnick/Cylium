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
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {storage} from "../api/firebase";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function EditFeedbox(props) {
    let allInputs = {imgUrl: ''}

    if (props.user && props.user.img_url_Profile && props.user.img_url_Profile.imgUrl){
        allInputs = props.user.img_url_Profile;
    }

    const classes = useStyles();
    const [switchState, setSwitch] = React.useState( false);
    const [successSubmit, setSuccess] = React.useState( false);
    const [name, setName] = React.useState(props.user.name);
    const [error, setError] = React.useState('');
    const [welcome, setWelcomeMessage] = React.useState(props.user.welcome);
    const [profileImage, setProfileImage] = React.useState('');
    const [imageAsFile, setImageAsFile] = React.useState('');
    const [imageAsUrl, setImageAsUrl] = React.useState(allInputs);
    const [isLoadingImage, setIsLoadingImage] = React.useState(false)

    const handleSwitch = (event) => {
        setSwitch(!switchState);
    };

    const handleSave = async (event) => {
        //TODO: send data to firestore
        event.preventDefault();
        try {
            await handleFireBaseUpload(event, imageAsFile)

            //write to store
            await db.collection('users').doc(props.email).set({
                name: name,
                welcome: welcome,
                url: props.url,
                img_url_Profile: imageAsUrl,
            });
            setSuccess(true);



        } catch (error) {
            console.log(error);
            setError({error: error.message});
        }

        if (setSuccess){
            setName('')
            setWelcomeMessage('')
        }
    };

    const handleFireBaseUpload = async (e, imageAsFile) => {
        e.preventDefault()
        console.log('start of upload')

        if(imageAsFile === '' ) {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        }
        if (imageAsFile) {


            const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
            //initiates the firebase side uploading
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot)
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    // gets the functions from storage refences the image storage in firebase by the children
                    // gets the download url then sets the image from firebase as the value for the imgUrl key:
                    storage.ref('images').child(imageAsFile.name).getDownloadURL()
                        .then(fireBaseUrl => {
                            setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
                        })
                })
        }


    }

    const handleNameChange= (name) => {
        setName(name)
    };

    const handleWelcomeChange= (message) => {
        setWelcomeMessage(message)
    };

    const handleImageAsFile = async(e) => {
        setIsLoadingImage(true);
        const image = e.target.files[0];
        await setImageAsFile(image);
        await handleFireBaseUpload(e, image)
        setIsLoadingImage(false);


    }

    const handleProfileImageChange= (event) => {
        //TODO: upload docs from computer
        let profile = null;
        setProfileImage(profile);
    };

    return (
        <Grid container spacing ={1} component = "main" className = {classes.root}>
            <Grid item xs={9} sm={4}  style={{backgroundColor: "white", maxWidth: 500, borderWidth: 1}} >
                <form onSubmit={handleSave} noValidate>
                <Box className={classes.box}>
                    <Url url = {props.url}/>
                    <Divider style = {{marginTop: 20}} />
                    <h2
                        style ={{
                            margin: 15,
                            marginRight: -10,
                            color:"#9FA5B1",
                            fontSize: 15,
                            fontWeight: 600
                        }}>
                        EDIT
                    </h2>
                    <Box className={classes.container}>
                    <Grid  justify="center" wrap="nowrap" spacing={2} >
                        <Grid
                            container
                              direction="column"
                              justify="center"
                              alignItems="center"
                        >
                            <Box border = {2} borderColor = {'#4D6DF1'} borderRadius = {50}>
                            <Avatar src={imageAsUrl.imgUrl} className = {classes.large}></Avatar>
                            </Box>
                            <input className={classes.input} id="contained-button-file" accept="image/*" type ='file' onChange={handleImageAsFile} />
                            <label htmlFor="contained-button-file">
                                <Button style ={{backgroundColor: '#4D6DF1', marginTop: 10}} variant="contained" color="primary" component="span">
                                    Upload
                                </Button>
                            </label>

                        </Grid>
                        <Grid style={{marginTop: 20}} item xs zeroMinWidth>
                            <TextField
                                onChange={e => handleNameChange(e.target.value)}
                                id="filled-basic"
                                label="Name"
                                fullWidth
                                variant="outlined"

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
                            </Box>
                        </Grid>
                        <p> Press update to save your changes. </p>
                        {/*<p> Depending on your file size, it may take some time for your profile image to load. Please wait for it to appear before pressing update </p>*/}
                    <Button
                        className={classes.submitButton}
                        type='submit'
                        variant="contained"
                        style={{marginRight: 45, marginLeft: 0, paddingRight: 60, paddingLeft: 60, borderRadius: 5, backgroundColor: "#4D6DF1",
                        }}
                    >
                        <p style = {{color: 'white', fontWeight: '600', margin: 5}}>
                            Update
                        </p>
                    </Button>
                </Box>
                </Box>
                    <Divider/>
                </form>

            </Grid>
            <Grid item xs={15} sm={8} >
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
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    input: {
        display: 'none',
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
