import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {BiHappy} from 'react-icons/bi'
import Popover from '@material-ui/core/Popover';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import {BiPencil,BiUser, BiCog,BiBarChartAlt2,BiMessageAltDetail} from "react-icons/bi"
import TextField from '@material-ui/core/TextField';
import {fade, ThemeProvider,makeStyles,} from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import {db} from "../../api/firebase";
import UserId from "../User/userID";

function TrackerTitleTag(props) {
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

    const openToChange = (val) => {
    };

    const [user, setUser] = React.useState(null);


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
        <Box borderBottom = {1} borderColor= {"white"} display="flex" justifyContent = 'space-between' alignItems = 'center' flexDirection="row" borderRadius = {0} borderBottom = {0} style = {{backgroundColor: props.backgroundColor, padding: 10, height: 60, width: '100%'}}>

                {props.user
                    ?
                   <UserId user={props.user}/>
                    : null
                }


            <Grid justify = "flex-end" container direction = "row">
                <Box style ={{marginRight: 10}} border = {1} borderColor = "white" borderRadius = {100}>
                    <IconButton color = "white" onClick={()=>props.switchCreating()}>
                        <BiCog style = {{color: "white"}} size = {20} />
                    </IconButton>
                </Box>

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
    }
}));

export default TrackerTitleTag;



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
