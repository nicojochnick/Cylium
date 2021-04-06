import React from 'react';
import {db, storage} from "../../../api/firebase";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import {editProjectIMG, editProjectName} from "../../../api/firestore";

let timerID = null;


function ProjectProfile(props) {
    const classes = useStyles();
    const [profileImage, setProfileImage] = React.useState('');
    const [imageAsFile, setImageAsFile] = React.useState('');
    const [imageAsUrl, setImageAsUrl] = React.useState('')
    const [isLoadingImage, setIsLoadingImage] = React.useState(false);
    const [successSubmit, setSuccess] = React.useState( false);
    const [error, setError] = React.useState('');
    const [isEditing, setEditing] = React.useState(false);
    const [projectTitle, setProjectTitle] = React.useState(props.channel.name);

    const changeName = (name) => {
        setProjectTitle(name);
        triggerAutoSave(name)
    };

    const saveName = (name) => {
        editProjectName(name,props.channel.channelID)
    };

    const saveIMG = (img) => {
        editProjectIMG(img, props.channel.channelID)

    };

    const triggerAutoSave = async (name) => {
        console.log("started saving...");
        if (timerID) {
            clearTimeout(timerID);
            timerID = null;
        }
        timerID = setTimeout(() => {
            saveName(name);
            console.log("finished saving name")
        }, 3000)
    };

    const handleFireBaseUpload = async (e, imageAsFile) => {
        e.preventDefault();
        if(imageAsFile === '' ) {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
            return;
        }
        if (imageAsFile) {
            const uploadTask = storage.ref(`/images/project/${imageAsFile.name}`).put(imageAsFile)
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
                    storage.ref('images/project/').child(imageAsFile.name).getDownloadURL()
                        .then(fireBaseUrl => {
                            setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}));
                            console.log(fireBaseUrl)
                            saveIMG(fireBaseUrl)
                        })
                })
        }
    };



    const handleImageAsFile = async(e) => {
        setEditing(true)
        setIsLoadingImage(true);
        const image = e.target.files[0];
        await setImageAsFile(image);
        console.log('saving img')
        await handleFireBaseUpload(e, image);
        setIsLoadingImage(false);
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
            alignItems="flex-start"
        >
            <Grid display = 'flex'justifyContent = 'center' alignItems = 'center' style = {{padding: 5}} container direction = 'row' >
                <input className={classes.input} id="contained-button-file" accept="image/*" type ='file' onChange={handleImageAsFile} />
                    <label htmlFor="contained-button-file">
                        <Box  style = {{margin: 5}} border = {1} borderColor = {'#5E5E5E'} borderRadius = {50}>
                            <Avatar src={props.channel.img} className = {classes.large}></Avatar>
                        </Box>
                    </label>
                <TextField
                    id="standard-basic"
                    placeholder="Untitled"
                    style ={{fontSize: 21, fontWeight: 500}}
                    onChange={(event) => changeName(event.target.value)}
                    defaultValue={projectTitle}
                    InputProps={{style: {fontSize: 30, margin: 10,fontWeight: 600, color:'#5E5E5E'}, disableUnderline: true,}}
                />

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
        width: theme.spacing(5),
        height: theme.spacing(5),

    },
    input: {
        display: 'none',
    },

}));


export default ProjectProfile;



{/*<Button*/}
{/*    className={classes.submitButton}*/}
{/*    onClick={handleSave}*/}
{/*    variant="contained"*/}
{/*    style={{marginRight: 0, marginLeft: 0, paddingRight: 0, paddingLeft: 0, borderRadius: 5, backgroundColor: "#4D6DF1",*/}
{/*    }}*/}
{/*>*/}
{/*    <p style = {{color: 'white', fontWeight: '600', margin: 5}}>*/}
{/*        Update*/}
{/*    </p>*/}
{/*</Button>*/}



{/*{isEditing*/}
{/*    ? <Button*/}
{/*        onClick={(event)=>(event)}*/}
{/*    >*/}
{/*        Save*/}
{/*    </Button>*/}
{/*    : null*/}
{/*}*/}
