import React from 'react';
import {db, storage} from "../../api/firebase";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";

function UserProfile(props) {
    const classes = useStyles();
    const [profileImage, setProfileImage] = React.useState('');
    const [imageAsFile, setImageAsFile] = React.useState('');
    const [imageAsUrl, setImageAsUrl] = React.useState(props.user.img_url_Profile)
    const [isLoadingImage, setIsLoadingImage] = React.useState(false);
    const [name, setName] = React.useState(props.user.name);
    const [successSubmit, setSuccess] = React.useState( false);
    const [welcome, setWelcomeMessage] = React.useState(props.user.welcome);
    const [error, setError] = React.useState('');

    const handleFireBaseUpload = async (e, imageAsFile) => {
        e.preventDefault();
        console.log('start of upload');
        if(imageAsFile === '' ) {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
            return;
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
    };



    const handleImageAsFile = async(e) => {
        console.log('upload')
        setIsLoadingImage(true);
        const image = e.target.files[0];
        await setImageAsFile(image);
        await handleFireBaseUpload(e, image)
        setIsLoadingImage(false);
    };


    const handleNameChange= (name) => {
        setName(name)
    };

    const handleSave = async (event) => {
        //TODO: send data to firestore
        event.preventDefault();
        try {
            await handleFireBaseUpload(event, imageAsFile);
            //write to store
            let pr = 0;
            let sfte = false;
            let p = 25;
            if (props.user.points) {
                p = props.user.points
            };
            if (props.user.sendFeedbackToEmail) {
                sfte = props.user.sendFeedbackToEmail
            };

            if (props.user.pointsRewarded) {
                pr = props.user.pointsRewarded
            };

            await db.collection('users').doc(props.email).set({
                name: name,
                welcome: welcome,
                url: props.url,
                img_url_Profile: imageAsUrl,
                points: p,
                pointsRewarded: pr,
                sendFeedbackToEmail: sfte,
            });
            setSuccess(true);

        } catch (error) {
            console.log(error);
            setError({error: error.message});
        }
        // if (setSuccess){
        //
        // }
    };

    const handleProfileImageChange= (event) => {
        //TODO: upload docs from computer
        let profile = null;
        setProfileImage(profile);
    };


    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
        >
            <Grid style = {{padding: 20}} container direction = 'row' >

                {/*<label htmlFor="contained-button-file">*/}
                {/*    <Button style ={{backgroundColor: '#4D6DF1, marginTop: 10}} variant="contained" color="primary" component="span">*/}
                {/*        Upload*/}
                {/*    </Button>*/}
                {/*</label>*/}
                <input className={classes.input} id="contained-button-file" accept="image/*" type ='file' onChange={handleImageAsFile} />
                <Box component="span" style = {{margin: 10}} border = {2} borderColor = {'#4D6DF1'} borderRadius = {50}>
                    <label htmlFor="contained-button-file">
                <Avatar src={imageAsUrl.imgUrl} className = {classes.large}></Avatar>
                    </label>
                </Box>
                <TextField
                    onChange={e => handleNameChange(e.target.value)}
                    id="filled-basic"
                    label="Name"
                    placeholder='John Doe'
                    value = {name}
                />
            </Grid>

            <Button
                className={classes.submitButton}
                onClick={handleSave}
                variant="contained"
                style={{marginRight: 45, marginLeft: 0, paddingRight: 60, paddingLeft: 60, borderRadius: 5, backgroundColor: "#4D6DF1",
                }}
            >
                <p style = {{color: 'white', fontWeight: '600', margin: 5}}>
                    Update
                </p>
            </Button>


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
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: "#10102F"

    },
    input: {
        display: 'none',
    },

}));


export default UserProfile;
