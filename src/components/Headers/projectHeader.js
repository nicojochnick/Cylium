import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchUsers from "../Utilities/Search/searchUsers";
import Box from "@material-ui/core/Box";
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import TextField from "@material-ui/core/TextField";
import {editProjectName, followProject, switchUserTheme, unfollowProject} from "../../api/firestore";
import ProjectProfile from "../Profile/Project/projectProfile";
import { BiBell, BiSearch, BiWorld, BiStar,BiMoon, BiMessage, BiCog, BiUserPlus, BiLink } from "react-icons/bi";
import IconButton from "@material-ui/core/IconButton";
import ProjectGroup from "../Groups/projectGroup";
import {Redirect} from "react-router";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {db} from "../../api/firebase";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import UserProfile from "../Profile/User/userProfile";
import DialogTitle from "@material-ui/core/DialogTitle";
import {RiRocket2Line} from "react-icons/ri"
import firebase from 'firebase/app';


function ProjectHeader(props) {
    const classes = useStyles();
    const [channels,setChannels] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [redirect,setRedirect] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState(0);
    const [init, setInit] = React.useState(false)
    const [redirectLink, setRedirectLink] = React.useState('');
    const [projectName, setProjectName] = React.useState('');
    const [openDiag, setOpenDiag] = React.useState(false);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false)



    const signout = () => {
        firebase.auth().signOut().then(function() {
        }).catch(function(error) {
        });
    };


    const handleCloseDiag = () => {
        setOpenDiag(!openDiag)
    };


    const handleInputSelected = (val) => {
        setInputValue(val);
        let channel = null;
        for (let i =0; i < channels.length; i++){
            if (val === channels[i].name) {
                channel = channels[i]
            }
        }
        console.log(channel);
        if (channel){
            setRedirect(true);
            setRedirectLink(channel.channelID)
        }
    };

    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const isFollowing = ( ) =>{
        let projects = props.user.channelIDs;
        for (let i = 0; i < projects.length; i++){
            if (props.channel.channelID === projects[i]){
                return true;
            }
        }
        return false;
    };

    const handleFollow = () => {
        let pIds = props.user.projectIDs;
        pIds[props.channel.channelID] =  {viewPort: [200,200], zoom: 0.01};
        followProject(props.user.email, props.channel.channelID, pIds)
    };

    const handleUnfollow = () => {
        setRedirect(true)
        let pIds = props.user.projectIDs;
        delete pIds[props.channel.channelID];
        unfollowProject(props.user.email, props.channel.channelID, pIds)

    };
    const getChannels = () =>{
        let filtered =  channels.filter(function(item) { return item.name !== null});
        return filtered
    };

    const switchTheme = () => {
        let theme = 'light';
        if (props.user.theme === 'light'){
            theme = 'dark'
        }
        switchUserTheme(props.user.email, theme)
    }

    useEffect(async () => {
        const projectRef = db.collection('channels');
        const snapshot = await projectRef.get();
        let channels = [];
        snapshot.forEach(doc => {
            channels.push(doc.data());
        });
        setChannels(channels)

    }, []);

    return (
        <Box style = {{ width: '100vw' }} display = 'flex' flexDirection = 'row' justifyContent = 'space-between' alignItems = 'space-between'>
            {redirect
                ?
                <Redirect to= {`/feed`} />
                : null
            }
            <div/>
        <Box borderRadius = {20} style = {{ height: 75, marginLeft: 30, backgroundColor:props.user.theme === 'light' ? 'white' : '#363638', boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.20)`,}} display = 'flex' flexDirection = 'row' justifyContent = 'space-between' alignItems = 'space-between' >


            <Box display = 'flex' flexDirection = 'row' justifyContent = 'center' alignItems = 'center'>
                <ProjectProfile user = {props.user} channel = {props.channel} />
            </Box>
                <div>
                <Box display='flex' justifyContent = 'center' alignItems = 'center' flexDirection='row'>
                    <div style ={{margin: 15,}}>
                    {/*{!isFollowing()*/}
                    {/*    ? <Button onClick = {handleFollow} style={{backgroundColor: props.channel.color}} variant={'contained'} > <p style = {{fontSize: 15, margin: 0, color:'white'}}> Follow  </p> </Button>*/}
                    {/*    : <Button  onClick = {handleUnfollow} variant={'outlined'}> <p style = {{fontSize: 15, margin: 0}} >Unfollow </p> </Button>*/}
                    {/*}*/}
                    </div>
                    <ProjectGroup channel = {props.channel} />

                    <IconButton onClick = {()=>props.openChat(!props.isChatOpen)}>
                            <BiMessage style = {{color: props.isChatOpen ? props.channel.color : 'grey'}}  />
                    </IconButton>
                    <IconButton onClick={props.handleClickOpenSettings}>
                            <BiCog />
                    </IconButton>
                    {/*<IconButton style = {{marginRight: 4}}>*/}
                    {/*    <BiSearch />*/}
                    {/*</IconButton>*/}

                    <Divider style = {{height: 75}} orientation="vertical" flexItem  />

                    <IconButton style = {{margin: 10}} onClick={()=>setIsSearchOpen(!isSearchOpen)}>
                        <RiRocket2Line style = {{color: isSearchOpen ? props.channel.color : 'grey'}} />
                    </IconButton>

                    { isSearchOpen
                        ?  <Autocomplete
                            id="free-solo-demo"
                            // freeSolo
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onInputChange={(event, newInputValue) => {
                                handleInputSelected(newInputValue)
                            }}
                            options={getChannels().map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    defaultValue={''}

                                    style = {{width: 300,margin: 10, marginRight: 15}}
                                    label="select destination..."
                                    margin="normal"
                                    variant="outlined"
                                />
                            )}
                        />
                        : null
                    }

                </Box>
                </div>
        </Box>
            <Box borderRadius = {100} style = {{marginRight: 50, height: 70,width: 70, backgroundColor:props.user.theme === 'light' ? 'white' : '#363638',boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.10)`,}} display = 'flex' flexDirection = 'row' justifyContent = 'center' alignItems = 'center' >
                <Box component="span" style = {{padding: 0}} border = {2} borderColor = {'lightgrey'} borderRadius = {50}>

                <Avatar onClick = {handleCloseDiag} src = {props.user.img_url_Profile.imgUrl} className = {classes.large} />
                </Box>
            </Box>

            <Dialog
                open={openDiag}
                maxWidth={'xs'}
                PaperProps={{

                    style: {
                        backgroundColor: props.user.theme === 'light' ? 'white' : 'black',
                    },


                }}
                style = {{}}
                onClose={handleCloseDiag}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <p style = {{color:props.user.theme === 'light' ? 'black' : 'white', fontSize: 25, margin: 20}}> Account </p>

                <DialogContent>

                    <Divider style = {{marginBottom: 5,backgroundColor:props.user.theme === 'light' ? 'black' : 'white'}} />

                    <UserProfile user = {props.user} />



                    <Box  style = {{marginTop: 5}} display = 'flex' flexDirection = 'row'  alignItems = 'center'>

                        <p style = {{color: props.user.theme === 'light' ? 'black' : 'white'}}> Theme: </p>

                        <IconButton>
                            {
                                <BiMoon onClick = {switchTheme} style = {{color: props.user.theme === 'light' ? 'black' : 'white'}} />
                            }
                        </IconButton>


                    </Box>


                    <Divider style = {{marginBottom: 5,backgroundColor:props.user.theme === 'light' ? 'black' : 'white'}} />


                    <Button style = {{backgroundColor: "#5F7FFF", margin:10}} onClick={()=>signout()} variant="contained" color="primary">
                        Signout
                    </Button>
                </DialogContent>

            </Dialog>
        </Box>
    );
}


const useStyles = makeStyles((theme) => ({
            typography: {
            padding: theme.spacing(2),
        },
            large: {
            width: theme.spacing(7),
            height: theme.spacing(7),

        },
        })
);

export default ProjectHeader;


{/*<SearchUsers channel={props.channel} user={props.user}/>*/}
