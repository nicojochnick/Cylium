import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import 'firebase/firestore';
import Popover from '@material-ui/core/Popover';
import 'draft-js/dist/Draft.css';
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { FiMoreVertical } from "react-icons/fi";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer/Drawer";
import {Link} from "react-router-dom";
import Container from '@material-ui/core/Container';

import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import TextField from "@material-ui/core/TextField/TextField";


const Feedback = (props) => {
    const classes = useStyles();
    const [didConfirm, setConfirm] = React.useState(false);
    const [didNotConfirm, setNotConfirm] = React.useState(false);

    const [isConfirming, setIsConfirming] = React.useState(false);
    const [amount, setAmount] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElReward, setAnchorElReward] = React.useState(null);
    const [openConfirm, setOpenConfirm] = React.useState(true);
    const [openNotConfirm, setOpenNotConfirm] = React.useState(true);


    let editorState = null;
    if (props.item.feedback) {
        editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(props.item.feedback)));
    }

    const handleThankYouMessage = (message) => {
        console.log(message)

    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClickReward = (event) => {
        setAnchorElReward(event.currentTarget);
    };
    const handleCloseReward = () => {
        setAnchorElReward(null);
    };

    const handleSendReward = (email, amount, type, giftcard) => {

        if (type == 'Giftcard') {


        } else {
            setAmount(amount);
            // setIsConfirming(true);
        }
    };

    const handleSendRewardConfirm = () => {
        setConfirm(true);

        if (props.user.points>amount) {
            props.handleSendReward(props.item.email, amount, props.item)
        } else {
            setNotConfirm(true)
        }
    };

    const handleSendRewardCancel = () => {
        setAmount(0);
        setIsConfirming(false);
        handleCloseReward()
    };
    const openReward = Boolean(anchorElReward);
    const idReward = openReward ? 'simple-popover-re' : undefined;
    return (
        <div>
        <Box className={classes.box} >
            <Grid
                container
                style = {{margin: -10,}}
                direction="row"
                justify="space-between"
                alignItems="flex-start">
                <Grid item direction = "column" justify = "flex-start">
                <p style = {{fontWeight: 450, fontSize: 17, marginTop: 0, color: "#10102F"}}>{props.item.subject}</p>
                    {!(props.item.anon)
                        ? <p style={{
                            marginTop: -12,
                            marginBottom: 15,
                            fontSize: 12,
                            color: "#4F5258"
                        }}>{props.item.email}</p>
                        : null
                    }
                </Grid>

                <IconButton onClick={handleClick} style = {{marginRight: -20}} aria-label="open">
                    <FiMoreVertical  size = {20}/>
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
                    }}>
                    <Button onClick={()=>props.handleDelete(props.item.id)} variant="contained" color="primary">
                        Delete
                    </Button>
                </Popover>
            </Grid>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Box border = {2} borderColor ={"#3162F0"} borderRadius = {100}>
                    <Avatar className = {classes.large} alt={(props.item.anon) ?null : props.item.email} src="/static/images/avatar/1.jpg" />
                    </Box>
                </Grid>
                <Grid className = {classes.contained} item xs>
                    {(props.item.feedback)
                        ?<Editor editorState={editorState} readOnly={true}/>
                        : null
                    }
                    <p style = {{marginTop: 0, fontSize: 12, color: "#9299A6"}}> {props.item.timeStamp.toDate().toDateString()} </p>
                </Grid>
            </Grid>
            <Grid
                container
                style = {{margin: -20, marginRight: -50,}}
                direction="row"
                justify="flex-end"
                alignItems="flex-end">


                {(didConfirm)
                    ?
                    <div>
                        {(didNotConfirm)
                            ? <div>

                                <Collapse in={openNotConfirm}>
                                    <Alert severity={'error'}
                                           action={
                                               <IconButton
                                                   aria-label="close"
                                                   color="inherit"
                                                   size="small"
                                                   onClick={() => {
                                                       setOpenNotConfirm(false);
                                                   }}
                                               >
                                                   <CloseIcon fontSize="inherit"/>
                                               </IconButton>
                                           }
                                    >
                                        You do not have enough points. Please add more under "Points". Note: it takes 24
                                        hours for your balance to update.
                                    </Alert>
                                </Collapse>

                            </div>
                            : <div>

                                <Collapse in={openConfirm}>
                                    <Alert
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setOpenConfirm(false);
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        {amount} points successfully sent
                                    </Alert>
                                </Collapse>

                            </div>
                        }

                    </div>


                    :<div>


                    {(!isConfirming)

                        ? <div>
                            <Button onClick={handleClickReward} variant="contained" noWrap style={{
                                borderRadius: 5,
                                margin: 10,
                                marginRight: 20,
                                backgroundColor: '#4D6DF1',

                            }}>
                                <p style={{color: 'white', margin: 3, fontWeight: 600}}>
                                    Send Reward
                                </p>
                            </Button>
                            <Popover
                                borderRadius = {20}
                                style={{borderRadius: 20}}
                                id={idReward}
                                open={openReward}
                                anchorEl={anchorElReward}
                                onClose={handleCloseReward}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                            >
                                <Container style = {{padding: 20, backgroundColor: "white",borderRadius: 20}}>
                                    {/*<p style = {{fontWeight: 700, fontSize: 15}}>Thank You Message</p>*/}
                                    {/*<Divider style={{marginBottom:10}}/>*/}
                                    <Grid container direction='row'>
                                        <Box display="flex" flexDirection = "column"  justifyContent="center">
                                        <TextField
                                            placeholder="1-2 sentences"
                                            multiline
                                            rows={10}
                                            style = {{marginRight: 10, minWidth: 220}}
                                            onChange={e => handleThankYouMessage(e.target.value)}
                                            label="thank you message"
                                            variant="outlined"
                                            rowsMax={7}
                                        />
                                            {(amount)
                                                ? <p> + {amount} points attached </p>
                                                : null

                                            }
                                        </Box>

                                        <Box  display="flex"  flexDirection = "column" justifyContent="center"  >
                                            {/*<p style = {{textAlign: 'center'}}> Add a Reward (optional) </p>*/}
                                            <Button variant="contained"
                                                    onClick={() => handleSendReward(props.item.email, 5, 'Giftcard', 'Starbucks - $5')}
                                                    style={{backgroundColor: "#14733A",marginBottom: 20, color: "white"}}> $5 Starbucks Gift Card</Button>

                                        <ButtonGroup
                                        orientation="vertical"
                                        color="primary"
                                        aria-label="vertical contained primary button group"
                                        variant="contained"
                                    >
                                            <Button onClick={() => handleSendReward(props.item.email, 5)}
                                                    style={{backgroundColor: "#AEAEF7"}}> Add 5 Points ($0.5)</Button>
                                            <Button onClick={() => handleSendReward(props.item.email, 10)}
                                                    style={{backgroundColor: "#A3A3EA"}}> Add 10 Points ($1)</Button>
                                            <Button onClick={() => handleSendReward(props.item.email, 25)}
                                                    style={{backgroundColor: "#9393E5"}}> Add 25 Points ($2.5)</Button>
                                            <Button onClick={() => handleSendReward(props.item.email, 50)}
                                                    style={{backgroundColor: "#7676E1"}}> Add 50 Points ($5)</Button>
                                            <Button onClick={() => handleSendReward(props.item.email, 100)}
                                                    style={{backgroundColor: "#5B5BDD"}}> Add 100 Points ($10)</Button>
                                            {/*<Button onClick={() => handleSendReward(props.item.email, 200)}*/}
                                            {/*        style={{backgroundColor: "#4545DF"}}> Add 200 Points ($20)</Button>*/}
                                        </ButtonGroup>
                                        </Box>
                                    </Grid>


                                    <Button
                                        fullWidth
                                        onClick={() => setIsConfirming(true)}
                                        style={{backgroundColor: "#10102F", marginTop: 10}}> <p style={{color:"white", margin:2}}> Send </p>
                                    </Button>

                                </Container>

                            </Popover>

                        </div>
                        :
                        <Box border={1} borderRadius={10} borderColor={"#3162F0"} style={{padding: 10}}>
                            <p> Please confirm you want to send the author of this feedback {amount} points.</p>
                            <Button color='primary' style={{margin: 10}} variant="outlined"
                                    onClick={() => handleSendRewardConfirm()}> Confirm </Button>
                            <Button variant="outlined" style={{margin: 10}}
                                    onClick={() => handleSendRewardCancel()}> Cancel </Button>
                        </Box>

                }
                    </div>
                }
            </Grid>
        </Box>
            <Divider/>
        </div>
    );
};


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    box:{
        margin: 10,
        marginRight: 0,
        padding: 35,
        // flexGrow: 1,
        // display: 'start',
        // overflow: 'auto',
        // flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1,
        // backgroundColor:"#F9FAFC",
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        color: theme.palette.getContrastText("#3574EE"),
        backgroundColor: "#10102F",
    },
    contained: {
        marginRight: 50
    },
    hr: {
        size: 1,
        color: '#C6C9D1',
        borderColor: "#C6C9D1"
    }
}));

export default Feedback;
