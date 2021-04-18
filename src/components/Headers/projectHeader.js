import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchUsers from "../Utilities/Search/searchUsers";
import Box from "@material-ui/core/Box";
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import TextField from "@material-ui/core/TextField";
import {editProjectName, followProject, unfollowProject} from "../../api/firestore";
import ProjectProfile from "../Profile/Project/projectProfile";
import { BiBell, BiCog, BiUserPlus, BiLink } from "react-icons/bi";

import IconButton from "@material-ui/core/IconButton";
import ProjectGroup from "../Groups/projectGroup";

function ProjectHeader(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
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
        let pIds = props.user.projectIDs;
        delete pIds[props.channel.channelID];
        unfollowProject(props.user.email, props.channel.channelID, pIds)

    };

    return (
        <Box style = {{marginLeft: -10, marginRight: 10, height: 75, width: '100vw'}} display = 'flex' flexDirection = 'row' justifyContent = 'space-between' alignItems = 'center' >
            <Box display = 'flex' flexDirection = 'row' justifyContent = 'center' alignItems = 'center'>
                <ProjectProfile channel = {props.channel} />
            </Box>


                <div>
                <Box display='flex' justifyContent = 'center' alignItems = 'center' flexDirection='row'>
                    <div style ={{margin: 15}}>
                    {!isFollowing()
                        ? <Button onClick = {handleFollow} style={{backgroundColor: props.channel.color}} variant={'contained'} > <p style = {{fontSize: 15, margin: 0, color:'white'}}> Follow  </p> </Button>
                        : <Button  onClick = {handleUnfollow} variant={'outlined'}> <p style = {{fontSize: 15, margin: 0}} >Unfollow </p> </Button>
                    }
                    </div>

                    <ProjectGroup channel = {props.channel} />
                    <IconButton onClick = {handleClick}>
                        <BiUserPlus />
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box display = 'flex' >
                            <BiLink/>
                            <p> add link </p>
                        </Box>
                    </Popover>

                    <IconButton>
                        <BiBell/>
                    </IconButton>
                    <IconButton onClick={props.handleClickOpenSettings}>
                        <BiCog />
                    </IconButton>
                </Box>



                </div>


        </Box>
    );
}
const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));
export default ProjectHeader;


{/*<SearchUsers channel={props.channel} user={props.user}/>*/}
