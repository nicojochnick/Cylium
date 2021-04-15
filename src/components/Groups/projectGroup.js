import React from 'react';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AvatarGroup from "@material-ui/lab/AvatarGroup/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover/Popover";
import {makeStyles} from "@material-ui/core";

export default function ProjectGroup(props) {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box display='flex' flexDirection='row'>
            <Button aria-describedby={id} onClick={handleClick}>
                {/*Open Popover*/}
                <AvatarGroup max={4}>
                    {}
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
            </Popover>

        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

