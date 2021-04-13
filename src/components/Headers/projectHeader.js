import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchUsers from "../Utilities/Search/searchUsers";
import Box from "@material-ui/core/Box";
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import TextField from "@material-ui/core/TextField";
import {editProjectName} from "../../api/firestore";
import ProjectProfile from "../Profile/Project/projectProfile";
import { BiBell, BiCog } from "react-icons/bi";

import IconButton from "@material-ui/core/IconButton";

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


    return (
        <Box style = {{marginLeft: -10, marginRight: 10, height: 75, width: '100vw'}} display = 'flex' flexDirection = 'row' justifyContent = 'space-between' alignItems = 'center' >
            <Box display = 'flex' flexDirection = 'row' justifyContent = 'center' alignItems = 'center'>
                <ProjectProfile channel = {props.channel} />
            </Box>

            {!isFollowing()
                ? <Button style = {{backgroundColor: '#7664FF'}} variant={'contained'} > Join </Button>
                :
                <Box display='flex' flexDirection='row'>
                    <Button aria-describedby={id} onClick={handleClick}>
                        {/*Open Popover*/}
                        <AvatarGroup max={4}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
                            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg"/>
                            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg"/>
                        </AvatarGroup>
                    </Button>
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
                        <SearchUsers channel={props.channel} user={props.user}/>
                    </Popover>
                    <IconButton>
                        <BiBell/>
                    </IconButton>
                    <IconButton onClick={props.handleClickOpenSettings}>
                        <BiCog />
                    </IconButton>
                </Box>
            }
        </Box>
    );
}
const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));
export default ProjectHeader;
