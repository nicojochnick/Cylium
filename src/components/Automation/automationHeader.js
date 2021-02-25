import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {BiHappy} from 'react-icons/bi'
import Popover from '@material-ui/core/Popover';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import {BiPencil,BiUser, BiCog,BiBarChartAlt2,BiMessageAltDetail,BiTime} from "react-icons/bi"
import TextField from '@material-ui/core/TextField';
import {fade, ThemeProvider,makeStyles,} from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import {db} from "../../api/firebase";
import AutomationId from "./automationID"
import UserId from "../User/userID";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';

import Switch from '@material-ui/core/Switch';
import AutomationRecurrenceHeaderEditor from "../AutomationManager/automationRecurrence/automationRecurrenceHeaderEditor";
import AutomationRecurrenceContainer from "../AutomationManager/automationRecurrence/automationRecurrenceContainer";

function AutomationHeader(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [onSwitch, setOnSwitch] = React.useState(props.tracker.on);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const openToChange = (val) => {
    };

    const [user, setUser] = React.useState(null);

    const handleSwitch = (event) => {
        setOnSwitch(!onSwitch)
        let trackerRef = db.collection('trackers').doc(props.id);
        return trackerRef.update({
            on: !onSwitch
        })

    };


    const changeTitle = (title) => {
        let trackerRef = db.collection('trackers').doc(props.id);
        return trackerRef.update({
            name: title
        })

    };


    //TODO delete this, user is passed down
    const getUser = async(email) => {
        await db.collection("users").doc(email)
            .onSnapshot(function(doc) {
                //Fixes bug where doc.data() is undefined on first signin
                let user = doc.data()
                if (user) {
                    setUser(user);
                }
            });
    };

    useEffect(() => {
        // getUser(props.ownerEmail);
    }, []);

    return (
        <Box
            borderBottom = {1}
            borderColor= {"white"}
            display="flex"
            justifyContent = 'space-between'
            alignItems = 'center'
            flexDirection="row"
            borderRadius = {0}
            borderBottom = {0}
            style = {{backgroundColor: props.backgroundColor, padding: 15, }}>

            <Grid container>

            <Grid container xs={10} sm = {10} md={10}  lg={10} alignItems = 'center' direction = "row">
            {props.name
                    ?
                   <AutomationId changeTitle = {changeTitle} title = {props.name} />
                    : null
            }
                <Divider className={classes.divider} orientation="vertical" flexItem />

                <Box display = 'flex' flexDirection = 'row'>
                <IconButton color = "white" onClick={()=>console.log('setup time')}>
                            <BiTime style = {{color: "white", margin: 0}} size = {25} />
                </IconButton>


                <AutomationRecurrenceContainer isHeader={true}/>
                </Box>
            </Grid>


            <Grid xs={2} md={2} lg={2} justify = "flex-end" container direction = "row">
                <FormControlLabel
                    control={
                        <Switch
                            checked={onSwitch}
                            onChange={()=>handleSwitch()}
                            name="checkedB"
                            color="default"
                        />
                    }
                />
            </Grid>


            </Grid>


        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
        color: "white"
    },
    input: {
        color: "white"
    },
    divider: {
        color: 'white',
        backgroundColor: 'white',
        border: 2,

    }
}));

export default AutomationHeader;



{/*<Box style ={{marginRight: 10}} border = {1} borderColor = "white" borderRadius = {100}>*/}
{/*    <IconButton color = "white" onClick={()=>props.switchData()}>*/}
{/*        <BiCog style = {{color: "white"}} size = {20} />*/}
{/*    </IconButton>*/}
{/*</Box>*/}


{/*<Button style = {{margin: 10, paddingBottom: 0, paddingTop: 0,}} onClick={()=>props.switchPosting()} variant="contained" color="primary">*/}
{/*    {(!props.isPosting) ? <p> Create Post </p> : <p> Delete Post </p>}*/}
{/*</Button>*/}


{/*<TextField*/}
{/*    value = {user.name}*/}
{/*    style = {{color: 'white', margin: 10}}*/}
{/*    InputProps={{*/}
{/*        className: classes.input,*/}
{/*        disableUnderline: true*/}
{/*    }}*/}
{/*    className={classes.margin}*/}
{/*    // onChange={e => props.handleTitleChange(e.target.value)}*/}
{/*/>*/}



{/*<Box border = {1} style = {{backgroundColor: "white"}} borderColor = "white" borderRadius = {100}>*/}
{/*<IconButton color = "white" onClick={()=>props.switchPosting()}>*/}
{/*    <BiMessageAltDetail style = {{color: props.backgroundColor}} size = {20} />*/}
{/*</IconButton>*/}
{/*</Box>*/}




{/*<Box style ={{marginRight: 10}} border = {1} borderColor = "white" borderRadius = {100}>*/}
{/*    <IconButton color = "white" onClick={()=>props.switchCreating()}>*/}
{/*        <BiPencil style = {{color: "white"}} size = {17} />*/}
{/*    </IconButton>*/}
{/*</Box>*/}

{/*<Box style ={{marginRight: 10}} border = {1} borderColor = "white" borderRadius = {100}>*/}
{/*    <IconButton color = "white" onClick={()=>props.switchData()}>*/}
{/*        <BiMessageAltDetail style = {{color: "white"}} size = {17} />*/}
{/*    </IconButton>*/}
{/*</Box>*/}
