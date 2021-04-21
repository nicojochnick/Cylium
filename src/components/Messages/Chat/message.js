import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import mscott from "../../../assets/images/mscott.png";
import Grid from "@material-ui/core/Grid";
import StructuredMessageItem from "./structuredMessageItem";
import AutomationItem from "../../../xdeprecated/Automation/automationItem";
import {db} from "../../../api/firebase";
import Divider from "@material-ui/core/Divider";
import UnstructuredMessageContent from "./unstructuredMessageContent"
import {Editor, EditorState,RichUtils} from 'draft-js';
import {convertFromRaw, convertToRaw} from 'draft-js';
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover/Popover";
import Button from "@material-ui/core/Button";
import { FiMoreVertical } from "react-icons/fi";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';

import { BiEdit, BiTrash} from "react-icons/bi";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {deleteMessage} from "../../../api/firestore";




function Message(props) {
    const classes = useStyles();
    const [user, setUser] = React.useState(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [anchorEl_edit, setAnchorEl_edit] = React.useState(null);
    const [messageContent, setMessageContent] = React.useState();
    const [label, setLabel] = React.useState(null);
    const [messageItem, setQuestionItem] = React.useState([]);
    const [backGroundColor, setBackGroundColor] = React.useState('white');

    const handleClick_Edit = (event) => {setAnchorEl_edit(event.currentTarget);};
    const handleClose_Edit = () => {setAnchorEl_edit(null);};

    // const open = Boolean(anchorEl);
    const [open, setOpen] = React.useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        event.stopPropagation();
        console.log('mousein');

        setAnchorEl(event.currentTarget);
        setOpen(true)
        setBackGroundColor('#F3F3F3')
    };

    const handlePopoverClose = () => {
        console.log('mouseout');

        setAnchorEl(null);
        setOpen(false)
        setBackGroundColor('white')
    };

    const handleMouseOverOpen = (e) => {
        console.log('mousein');
        handlePopoverOpen(e);
        setBackGroundColor('#F4F4F4');
    };
    const handleMouseLeave= (e) => {
        console.log('mouseout');
        handlePopoverClose(e);
        setBackGroundColor('white');
    };


    const getUser = async(email) => {
        await db.collection("users").doc(email)
            .onSnapshot(function(doc) {
                //Fixes bug where doc.data() is undefined on first signin
                let user = doc.data();
                if (user) {
                    setUser(user);
                }
            });
    };

    const deleteCurrentMessage = () => {
        deleteMessage(props.message.messageID)
    };


    const handleEditLabel = (event) => {
        if (!isEditing){setIsEditing(true)}
        setLabel(event.target.value)
    };


    useEffect(() => {
        getUser(props.senderID);

    }, []);
    return (
        <div className={classes.root}>

            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                style = {{margin: 10}}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'right',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'right',
                    horizontal: 'right',
                }}
                // PaperProps={{onMouseEnter: handlePopoverOpen, onMouseLeave: handlePopoverClose}}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >

                <ButtonGroup
                    // style = {{width: 100,}}
                    orientation="horizontal"
                    color="default"
                >

                    {/*<Tooltip title="Edit" arrow  placement={'top'}>*/}
                    {/*    <Button onClick={()=> console.log('delete')}>*/}
                    {/*        <BiEdit size = {20}/>*/}
                    {/*    </Button>*/}
                    {/*</Tooltip>*/}

                    <Tooltip title="Delete" placement={'top'}  arrow>
                        <Button  onClick={()=> deleteCurrentMessage()}>
                            <BiTrash size = {20}/>
                        </Button>
                    </Tooltip>

                </ButtonGroup>

            </Popover>
            {user
                ?
                <Box
                    color = {'#A3A0B1'}
                    className={classes.box}
                    boxShadow={0}
                    onMouseEnter={(e)=> setBackGroundColor('#F4F4F4')}
                    onMouseLeave={(e)=>setBackGroundColor('white')}
                    style={{padding: 10, minHeight: 100,boxShadow: "0px 0px 0px #ECECEC",backgroundColor:backGroundColor , }}
                >
                    <Box display = 'flex'  flexDirection = 'row' style={{margin: 0}}>
                        <Box  display = 'flex' justifyContent = 'center' alignItems ='center' style={{margin: 5, width: 45, height: 46,}} border={2} borderColor={'#E7E7E7'} borderRadius={50}>
                                <Avatar  src={user.img_url_Profile.imgUrl} style ={{margin:2}} className={classes.large}/>
                        </Box>

                        <Box flexDirection = 'column' style = {{width: 300}}>
                            <Grid container style = {{margin: 0}}>
                            <p style={{
                                margin: 8,
                                marginTop: 2,
                                marginLeft: 5,
                                marginBottom: 0,
                                fontSize: 16,
                                color: '#2F2C37',
                                fontWeight: 500,
                            }}>{user.name} </p>
                            <p style={{color: '#2F2C37', fontSize: 12, margin: 5, marginTop: 5, marginLeft: 5}}>{props.message.timeStamp.toDate().toDateString()}</p>
                            </Grid>

                            <Box className={classes.root} style = {{margin: 3, marginTop: -10, width:330, color :'#555555', }}>
                                {(props.message.structuredMessage)
                                    ? <div> {Object.keys(props.message.messageData).map((item) => <
                                        StructuredMessageItem packageItem={props.message.messageData[item]}/>)
                                    }
                                    </div>
                                    : <div>
                                        <UnstructuredMessageContent content = {props.message.messageContent}/>
                                    </div>
                                }
                            </Box>
                        </Box>
                        <Box>
                            <IconButton onClick={handlePopoverOpen}  aria-label="open">
                                <FiMoreVertical  size = {17}/>
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                : null
            }




            <Divider/>

        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    box:{
        padding: 0,
        display: 'start',
        flexDirection: 'column',
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    fixedHeight: {
        height: 350,
    },
    popover: {
    },
}));

export default Message;


{/*{(props.message.structuredMessage)*/}
{/*    ? <div> {Object.keys(props.message.messageData).map((item) => <*/}
{/*        StructuredMessageItem packageItem={props.message.messageData[item]}/>)*/}
{/*    }*/}
{/*    </div>*/}
{/*    : null*/}
{/*}*/}
