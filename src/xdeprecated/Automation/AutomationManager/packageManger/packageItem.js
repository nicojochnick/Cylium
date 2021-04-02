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
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import {db} from '../../../../api/firebase'
import { makeStyles } from '@material-ui/core';
import Divider from "@material-ui/core/Divider";
import {BiDotsVerticalRounded, BiChat,BiCheckSquare,BiStar, BiBell, BiLink} from "react-icons/bi"
import EditTeamMemberItem from "../editTeamMemberItem";
import { FiMoreVertical } from "react-icons/fi";
import {convertFromRaw, EditorState, RichUtils} from "draft-js";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover/Popover";


function PackageItem(props) {
    const classes = useStyles();
    const [anchorEl_edit, setAnchorEl_edit] = React.useState(null);
    const [scheduleValue, setScheduleValue] = React.useState(props.tracker.call[props.item].schedule);
    const [checked, setChecked] = React.useState([1]);
    const [friendList, setFriendList] = React.useState([]);
    const [receiverFriendList, setReceiverFriendList] = React.useState([]);
    const [questionItem, setQuestionItem] = React.useState(props.tracker.call[props.item]);
    const [actionType, setType] =  React.useState(props.tracker.call[props.item].actionType);
    const [label, setLabel] = React.useState(props.tracker.call[props.item].label);
    const [rating, setRating] = React.useState(5)
    const [isEditing, setIsEditing] = React.useState(false);
    const handleClick_Edit = (event) => {setAnchorEl_edit(event.currentTarget);};
    const handleClose_Edit = () => {setAnchorEl_edit(null);};
    const open = Boolean(anchorEl_edit);

    const updatePackageItemLabel = async () =>{
        let value = label;
        let trackRef = await db.collection('trackers').doc(props.tracker.id).get();
        let trackData = trackRef.data();
        let calls = trackData.call;
        for (let i of calls){
            if (questionItem.packageItemID === i.packageItemID){
                i.label = value;
            }
        };

        let res = await db.collection('trackers').doc(props.tracker.id).update(
            {call: calls}
        );

        setIsEditing(false)
    };

    //TODO fix

    const deleteQuestion = async() => {
        let trackRef = await db.collection('trackers').doc(props.tracker.id).get();
        let trackData = trackRef.data();

        let calls = trackData.call;

        for (let i in calls){
            if (questionItem.packageItemID === calls[i].packageItemID){
                calls.splice(i,1)
            }
        };
        let res = await db.collection('trackers').doc(props.tracker.id).update(
            {call: calls}
        )
    };
    const handleEditLabel = (event) => {
        if (!isEditing){setIsEditing(true)}
        setLabel(event.target.value)
    };

    const onChangeSlider = (val) => {
        setRating(val)
    }

    const setIcon = () => {
        console.log(actionType);
        if (actionType == 'ask') {
            return <BiChat size = {22} style = {{color: 'grey'}} />
        } else if (actionType =='track') {
            return <BiCheckSquare size = {22} style = {{color: 'grey'}} />
        }else if (actionType =='rate') {
            return <BiStar size = {22} style = {{color: 'grey'}} />
        }else if (actionType =='remind') {
            return <BiBell size = {22} style = {{color: 'grey'}} />
        }else if (actionType =='share') {
            return <BiLink size = {22} style = {{color: 'grey'}} />
        }
    };

    useEffect(() => {
        if (props.user.friendList) {
            let res = props.user.friendList.filter(friend => friend.pending === false);
            setFriendList(res);

        };

        setIcon()
    }, []);


    return (
        <Box  border = {1}
              borderColor = {'#AFADBC'}
              display = 'flex'  flexDirection="row"
              borderRadius ={10}
              style ={{padding: 8, paddingLeft: 12, margin: 10, backgroundColor: 'white', boxShadow: "0px 0px 0px #D7D7DA"}} >
            <Grid container justify={'space-between'} alignItems={'center'} direction = 'row'>
                <Grid item xs={10} md={10} lg={10} direction={'row'}  >
                    <Box className={classes.root} alignItems="center" display="flex" flexDirection="row" >
                        {/*<Box  display="flex" style = {{height: 25, width: 25, margin: 10}} borderRadius = {100} border = {0} borderColor = "lightgrey">*/}
                        {/*    {*/}
                        {/*        setIcon()*/}
                        {/*    }*/}
                        {/*</Box>*/}
                        {(actionType == 'ask')
                            ? <Box className={classes.root}  alignItems="center" display="flex" flexDirection="column" >
                                <TextField
                                    placeholder="request info, ask a question etc..."
                                    multiline
                                    onChange={(event) => handleEditLabel(event)}
                                    defaultValue={label}
                                    style={{fontSize: 10}}
                                    className={classes.packageInputText}
                                    fullWidth
                                    InputProps={{style: {fontSize: 15, margin: 5}, disableUnderline: true,}}
                                    rowsMax={5}
                                />
                            </Box>
                            : null
                                }
                        {(actionType == 'track')
                            ? <Box className={classes.root}  alignItems="center" justifyContent = 'flex-start' display="flex" flexDirection="row" >
                                <TextField
                                    placeholder="add a todo"
                                    multiline
                                    onChange={(event) => handleEditLabel(event)}
                                    defaultValue={label}
                                    style={{fontSize: 10}}
                                    className={classes.packageInputText}
                                    fullWidth
                                    InputProps={{style: {fontSize: 15, margin: 5,}, disableUnderline: true,}}
                                    rowsMax={5}
                                />
                                <Checkbox
                                    size = {15}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    classesName = {classes.checkbox}
                                />

                            </Box>
                            : null
                        }


                        {(actionType == 'rate')
                            ? <Box className={classes.root}  alignItems="center" justifyContent = 'center' display="center" flexDirection="column" >
                                <TextField
                                    placeholder="ask for a rating (1-10)"
                                    multiline
                                    onChange={(event) => handleEditLabel(event)}
                                    defaultValue={label}
                                    style={{fontSize: 10}}
                                    className={classes.packageInputText}
                                    fullWidth
                                    InputProps={{style: {fontSize: 15, margin: 5,}, disableUnderline: true,}}
                                    rowsMax={5}
                                />
                                <Slider
                                    defaultValue={5}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    onChangeCommitted={(e, val)=>{onChangeSlider(val)}}
                                    step={1}
                                    marks
                                    min={0}
                                    max={10}
                                />

                            </Box>
                            : null
                        }

                        {(actionType == 'remind')
                            ? <Box className={classes.root}  alignItems="center" justifyContent = 'center' display="center" flexDirection="column" >
                                <TextField
                                    placeholder="add a reminder"
                                    multiline
                                    onChange={(event) => handleEditLabel(event)}
                                    defaultValue={label}
                                    style={{fontSize: 10}}
                                    className={classes.packageInputText}
                                    fullWidth
                                    InputProps={{style: {fontSize: 15, margin: 5,}, disableUnderline: true,}}
                                    rowsMax={5}
                                />

                            </Box>
                            : null
                        }


                            </Box>

                    {isEditing
                        ?
                        <Button
                            style = {{marginTop: 10}}
                            variant="contained"
                            color = 'primary'
                            className={classes.button}
                            onClick={()=>updatePackageItemLabel()}
                        >
                            Save
                        </Button>
                        :null
                    }
                </Grid>

                <IconButton onClick={handleClick_Edit} style = {{marginRight: -20}} aria-label="open">
                    <FiMoreVertical  size = {20}/>
                </IconButton>


                <Popover
                    // id={id}
                    open={open}
                    anchorEl={anchorEl_edit}
                    onClose={handleClose_Edit}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                    <Button onClick={()=>deleteQuestion()} variant="contained" color="primary">
                        Delete
                    </Button>
                </Popover>
            </Grid>
        </Box>
    )
}

export default PackageItem;
const useStyles = makeStyles({
    menu: {
    },
    packageInputText: {
        fontSize: 13

    },
    root: {
        display: 'flex',
        flexGrow: 1

    },
    checkbox:{
        width: 30,
        height: 30,

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




///

{/*<Grid item direction={'row'}>*/}
{/*    <Box style = {{padding: 0, width: 190, margin: 3}} display="flex" flexDirection="row"  borderRadius = {10} border = {1} borderColor = {'lightgrey'} >*/}
{/*        <Button style = {{margin: 0}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_team}>*/}
{/*            Recipients:*/}
{/*        </Button>*/}
{/*        <Menu*/}
{/*            id="simple-menu"*/}
{/*            anchorEl={anchorEl_team}*/}
{/*            keepMounted*/}
{/*            className={classes.menu}*/}
{/*            open={Boolean(anchorEl_team)}*/}
{/*            onClose={handleClose_team}*/}
{/*        >*/}
{/*            {friendList.map((value) => {*/}
{/*                const labelId = `checkbox-list-secondary-label-${value}`;*/}
{/*                return (*/}
{/*                    <EditTeamMemberItem*/}
{/*                        flat = {true}*/}
{/*                        withSelect = {true}*/}
{/*                        user = {value}*/}
{/*                        value = {value}*/}
{/*                        handleToggle = {handleToggle}*/}
{/*                        labelID = {labelId}*/}
{/*                    />*/}
{/*                );*/}
{/*            })}*/}
{/*        </Menu>*/}
{/*        <AvatarGroup max={4}>*/}
{/*            {receiverFriendList.map((friend) => {*/}
{/*                return (*/}
{/*                    <Avatar alt={friend.name} src={friend.img_url_Profile.imgUrl}/>*/}
{/*                    )}*/}
{/*                    )}*/}
{/*        </AvatarGroup>*/}
{/*    </Box>*/}
{/*</Grid>*/}
{/*<Grid item direction={'row'}>*/}
{/*    <Box style = {{padding: 0, width: 190, margin: 5}} borderColor={ 'lightgrey'} display="flex" flexDirection="row"  borderRadius = {10} border = {1}>*/}
{/*        <Button style = {{margin: 0}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick_schedule}>*/}
{/*            Schedule:*/}
{/*        </Button>*/}
{/*        <Menu*/}
{/*            id="simple-menu"*/}
{/*            anchorEl={anchorEl_schedule}*/}
{/*            keepMounted*/}
{/*            open={Boolean(anchorEl_schedule)}*/}
{/*            onClose={handleClose_schedule}*/}
{/*        >*/}
{/*            <div style = {{padding: 10}}>*/}
{/*            <FormControl component="fieldset">*/}
{/*                <RadioGroup aria-label="schedule" name="schedule" value={scheduleValue} onChange={(e)=>changeSchedule(e)}>*/}
{/*                    <FormControlLabel value="Bi-Weekly" control={<Radio />} label="Bi-Weekly" />*/}
{/*                    <FormControlLabel value="Weekly" control={<Radio />} label="Weekly" />*/}
{/*                    <FormControlLabel value="Bi-Monthly" control={<Radio />} label="Bi-Monthly" />*/}
{/*                    <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />*/}
{/*                    <FormControlLabel value="Quarterly" control={<Radio />} label="Quarterly" />*/}
{/*                </RadioGroup>*/}
{/*            </FormControl>*/}
{/*            </div>*/}
{/*        </Menu>*/}
{/*        <p style = {{margin: 10}}>*/}
{/*            {scheduleValue}*/}
{/*        </p>*/}
{/*    </Box>*/}
{/*</Grid>*/}




///Reciever

//
// const addReceivers = async(user) => {
//
//     let trackRef = await db.collection('trackers').doc(props.tracker.id).get();
//     let trackData = trackRef.data();
//     let calls = trackData.call;
//     for (let question of calls){
//         console.log(question)
//         if (questionItem.id === question.id){
//             if (!question.receivers.includes(user.email)){
//                 question.receivers.push(user.email)
//             }
//
//         }
//     };
//
//     let res = await db.collection('trackers').doc(props.tracker.id).update(
//         {call: calls}
//     );
// };
//
// const removeReceivers = async (user) => {
//     let value = label;
//     let trackRef = await db.collection('trackers').doc(props.tracker.id).get();
//     let trackData = trackRef.data();
//     let calls = trackData.call;
//     for (let question of calls){
//         console.log(question)
//         if (questionItem.id === question.id){
//             if (question.receivers.includes(user.email)){
//                 let elem =  question.receivers.indexOf(user.email);
//                 question.receivers.splice(elem, 1)
//
//             }
//
//         }
//     };
//
//     let res = await db.collection('trackers').doc(props.tracker.id).update(
//         {call: calls}
//     );
//
// };
//
// const createReceiverFriendList = async(friendList) => {
//     let receivers = props.tracker.call[props.item].receivers;
//     if (!receivers){return}
//
//
//     //create list
//     let receiverFriendList = [];
//     let rec
//
//     for (let i of friendList){
//         if (receivers.includes(i.email)){
//             receiverFriendList.push(i)
//         }
//     }
//
//     //addcheckmarks to friendList
//     for (let friend of friendList){
//         if (receivers.includes(friend.email)){
//             friend.checked = true;
//         } else{
//             friend.checked = false;
//         }
//     }
//
//     setFriendList(friendList);
//     setReceiverFriendList(receiverFriendList)
// };


// const changeSchedule = async (event) => {
//     setScheduleValue(event.target.value);
//     let selected = event.target.value;
//     let trackRef = await db.collection('trackers').doc(props.tracker.id).get();
//     let trackData = trackRef.data();
//     let calls = trackData.call;
//     for (let i of calls){
//         if (questionItem.id === i.id){
//             i.schedule = selected;
//         }
//     };
//
//     let res = await db.collection('trackers').doc(props.tracker.id).update(
//         {call: calls}
//     )
// };
//


//
// const handleToggle = (value, user,) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];
//     if (currentIndex === -1) {
//         newChecked.push(value);
//         console.log('add');
//         addReceivers(user)
//     } else {
//         newChecked.splice(currentIndex, 1);
//         console.log('delete');
//         removeReceivers(user)
//     }
//     setChecked(newChecked);
// };



///Pop UP Management


// const handleClick = (event) => {setAnchorEl(event.currentTarget);};
// const handleClose = () => {setAnchorEl(null);};
// const handleClick_team = (event) => {setAnchorEl_team(event.currentTarget);};
// const handleClose_team = () => {setAnchorEl_team(null);};
// const handleClick_schedule = (event) => {setAnchorEl_schedule(event.currentTarget);};
// const handleClose_schedule = (event) => {setAnchorEl_schedule(null);};
