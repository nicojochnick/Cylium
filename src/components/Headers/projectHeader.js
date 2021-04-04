import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SearchUsers from "../Utilities/Search/searchUsers";
import Box from "@material-ui/core/Box";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

function ProjectHeader(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <Box style = {{marginLeft: 10, marginRight: 10, height: 75, width: '100vw'}} display = 'flex' flexDirection = 'row' justifyContent = 'space-between' alignItems = 'center' >
            <p style ={{fontSize: 21, fontWeight: 500}}> {props.channel.name}</p>
            <Button aria-describedby={id} onClick={handleClick}>
                {/*Open Popover*/}
            <AvatarGroup max={4}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
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
                <SearchUsers channel = {props.channel} user = {props.user} />
            </Popover>
        </Box>
    );
}
const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


export default ProjectHeader;
