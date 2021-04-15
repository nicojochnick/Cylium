import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AvatarGroup from "@material-ui/lab/AvatarGroup/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover/Popover";
import {makeStyles} from "@material-ui/core";
import {db} from "../../api/firebase";
import UserProfile from "../Profile/User/userProfile";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";

export default function ProjectGroup(props) {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [group,setGroup] = React.useState([]);
    const [role, setRole] = React.useState(10);

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const getProjectGroup = () => {
        let users = [];

        db.collection('users').where('projects', 'array-contains', props.channel.channelID)
            .onSnapshot( (querySnapshot) => {
                    querySnapshot.forEach(function (doc) {
                        console.log(doc.data())
                        let c = doc.data();
                        users.push(c);
                    });
                    setGroup(users);
                },
                error => console.log(error));
    };

    useEffect(() => {
        getProjectGroup()
    }, []);

    console.log(group)

    return (
        <Box display='flex' flexDirection='row'>
            <Button aria-describedby={id} onClick={handleClick}>
                {/*Open Popover*/}
                <AvatarGroup max = {7}>
                    { group.map((item) => {
                        return   <Box component="span" borderRadius = {100} border= {2} style ={{ padding: 1, margin: 5}} borderColor = {'#B9B9B9'} >
                            <Avatar  src = {item.img_url_Profile.imgUrl}/>
                        </Box>
                    })

                    }
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
                <Box style = {{maxHeight: 600, }}>
                    {group.map((item) => {
                        return <div>
                        <Box display = 'flex' justifyContent = 'space-between' alignItems = 'center' flexDirection = 'row' style = {{width: 300, padding: 5}}>
                            <Box display = 'flex' flexDirection = 'row' alignItems = 'center' >
                            <Box component="span" borderRadius = {100} border= {2} style ={{padding: 3, margin: 5}} borderColor = {'#EFEFEF'} >
                                    <Avatar  src = {item.img_url_Profile.imgUrl}/>
                            </Box>
                                    <p style = {{margin: 4,}}> {item.name}</p>
                            </Box>
                            <FormControl className={classes.formControl}>
                                <Select
                                    variant={'outlined'}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    style ={{padding: 0, height: 45}}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Admin</MenuItem>
                                    <MenuItem value={20}>Team</MenuItem>
                                    <MenuItem value={30}>Member</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Divider/>
                        </div>

                    })
                    }

                </Box>

            </Popover>


        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

