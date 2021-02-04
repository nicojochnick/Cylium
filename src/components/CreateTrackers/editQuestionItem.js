import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { BiQuestionMark, BiPlus } from "react-icons/bi"
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {db} from '../../api/firebase'
import { makeStyles } from '@material-ui/core';
import Divider from "@material-ui/core/Divider";
import EditTeamMemberItem from "./editTeamMemberItem";
import {convertFromRaw, EditorState, RichUtils} from "draft-js";



function EditQuestionItem(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl_team, setAnchorEl_team] = React.useState(null);
    const [anchorEl_schedule, setAnchorEl_schedule] = React.useState(null);
    const [scheduleValue, setScheduleValue] = React.useState('monthly');
    const [checked, setChecked] = React.useState([1]);
    const [friendList, setFriendList] = React.useState([]);
    const [receiverFriendList, setReceiverFriendList] = React.useState([])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick_team = (event) => {
        setAnchorEl_team(event.currentTarget);
    };

    const handleClose_team = () => {
        setAnchorEl_team(null);
    };

    const handleClick_schedule = (event) => {
        setAnchorEl_schedule(event.currentTarget);
    };


    const handleClose_schedule = (event) => {
        setAnchorEl_schedule(null);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const changeSchedule = async (event) => {
        handleClick_schedule(event.target);
        let selected = event.target.value;
        let trackRef = await db.collection('trackers').doc(props.tracker.id).get();
        let trackData = trackRef.data();

        let res = await db.collection('trackers').doc(props.tracker.id).update(

       )
    };


    const addReceivers = () => {


    };

    const removeReceivers = () => {


    };

    const createReceiverFriendList = (friendList) => {

        let receivers = props.tracker.call[props.item].receivers;
        if (!receivers){return}
        let receiverFriendList = [];

        for (let i of friendList){
            if (receivers.includes(i.email)){
                receiverFriendList.push(i)
            }
        }
        setReceiverFriendList(receiverFriendList)
    };


    useEffect(() => {
        if (props.user.friendList) {
            let res = props.user.friendList.filter(friend => friend.pending === false);
            setFriendList(res);
            if (props.tracker.call[props.item].receivers.length > 0){
                createReceiverFriendList(res)
            };
        };



    }, []);


    return (

        <Box flexDirection="row" borderRadius ={10} style ={{padding: 5, margin: 10, boxShadow: "0px 5px 10px #D7D7DA", }} >
            <Grid container justify={'space-between'} alignItems={'center'} direction = 'row'>
                <Grid direction={'row'} item xs ={12} md={6} lg = {6}>
                    <Box alignItems="center" display="flex" flexDirection="row" >
                        <Box style = {{height: 25, width: 25, margin: 10}} borderRadius = {100} border = {2} borderColor = "lightgrey">
                            <BiQuestionMark size = {20} style = {{color: 'lightgrey'}} />
                        </Box>
                        <TextField
                            placeholder="add a questions"
                            multiline
                            value =  {props.tracker.call[props.item].label}
                            fullWidth
                            InputProps={{ disableUnderline: true }}
                            rowsMax={4}
                        />
                    </Box>
                </Grid>


                <Grid item direction={'row'}>
                    <Box style = {{padding: 0, width: 190, margin: 3}} display="flex" flexDirection="row"  borderRadius = {10} border = {1} borderColor = {'lightgrey'} >
                        <Button style = {{margin: 0}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_team}>
                            Recipients:
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl_team}
                            keepMounted
                            className={classes.menu}
                            open={Boolean(anchorEl_team)}
                            onClose={handleClose_team}
                        >
                            {friendList.map((value) => {
                                const labelId = `checkbox-list-secondary-label-${value}`;
                                return (
                                    <EditTeamMemberItem
                                        flat = {true}
                                        withSelect = {true}
                                        user = {value}
                                        value = {value}
                                        handleToggle = {handleToggle}
                                        labelID = {labelId}
                                        checked = {checked} />
                                );
                            })}
                        </Menu>
                        <AvatarGroup max={4}>
                            {receiverFriendList.map((friend) => {
                                return (
                                    <Avatar alt={friend.name} src={friend.img_url_Profile.imgUrl}/>
                                    )}
                                    )}
                        </AvatarGroup>
                    </Box>

                </Grid>

                <Grid item direction={'row'}>
                    <Box style = {{padding: 0, width: 190, margin: 5}} borderColor={ 'lightgrey'} display="flex" flexDirection="row"  borderRadius = {10} border = {1}>
                        <Button style = {{margin: 0}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_schedule}>
                            Schedule:
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl_schedule}
                            keepMounted
                            open={Boolean(anchorEl_schedule)}
                            onClose={handleClose_schedule}
                        >
                            <div style = {{padding: 10}}>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="schedule" name="schedule" value={scheduleValue} onChange={(e)=>setScheduleValue(e.target.value)}>
                                    <FormControlLabel value="Bi-Weekly" control={<Radio />} label="Bi-Weekly" />
                                    <FormControlLabel value="Weekly" control={<Radio />} label="Weekly" />
                                    <FormControlLabel value="Bi-Monthly" control={<Radio />} label="Bi-Monthly" />
                                    <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
                                    <FormControlLabel value="Quarterly" control={<Radio />} label="Quarterly" />
                                </RadioGroup>
                            </FormControl>
                            </div>
                        </Menu>
                        <p style = {{margin: 10}}>
                            {scheduleValue}
                        </p>
                    </Box>

                </Grid>


            </Grid>
        </Box>
    )
}

export default EditQuestionItem;


const useStyles = makeStyles({
    menu: {
    }
});


{/*<Grid item direction={'row'}>*/}
{/*    <Box style = {{padding: 0}} borderColor={ 'lightgrey'} display="flex" flexDirection="row"  borderRadius = {10} border = {1}>*/}
{/*        <Button style = {{margin: 0}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>*/}
{/*            Type:*/}
{/*        </Button>*/}
{/*        <Menu*/}
{/*            id="simple-menu"*/}
{/*            anchorEl={anchorEl}*/}
{/*            keepMounted*/}
{/*            open={Boolean(anchorEl)}*/}
{/*            onClose={handleClose}*/}
{/*        >*/}
{/*            <MenuItem onClick={handleClose}>Text</MenuItem>*/}
{/*            <MenuItem onClick={handleClose}>Number</MenuItem>*/}
{/*        </Menu>*/}
{/*        <p style = {{margin: 10}}>*/}
{/*            Text*/}
{/*        </p>*/}
{/*    </Box>*/}
{/*</Grid>*/}
