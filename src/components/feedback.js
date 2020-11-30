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
import { FiMoreVertical } from "react-icons/fi";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer/Drawer";


const Feedback = (props) => {
    const classes = useStyles();
    let editorState = null
    if (props.item.feedback) {
        editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(props.item.feedback)));
    }

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
        <div>
        <Box className={classes.box} >
            <Grid
                container
                style = {{margin: -10,}}
                direction="row"
                justify="space-between"
                alignItems="flex-start">

                <p style = {{fontWeight: 450, fontSize: 17, marginTop: 0, color: "#4F5258"}}>{props.item.subject}</p>


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
                    }}
                >
                    <Button onClick={()=>props.handleDelete(props.item.id)} variant="contained" color="primary">
                        Delete
                    </Button>
                </Popover>


            </Grid>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar className = {classes.large} alt={props.item.email} src="/static/images/avatar/1.jpg" />
                </Grid>
                <Grid className = {classes.contained} item xs>
                    {/*<p style = {{marginTop:0, fontSize: 13, color: "#4F5258"}}>{props.item.email}</p>*/}
                    {(props.item.feedback)
                        ?<Editor editorState={editorState} readOnly={true}/>
                        : null
                    }
                    <p style = {{marginTop: 0, fontSize: 12, color: "#9299A6"}}> {props.item.timeStamp.toDate().toDateString()} </p>

                </Grid>
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
        padding: 25,
        // flexGrow: 1,
        // display: 'start',
        // overflow: 'auto',
        // flexDirection: 'row',
        backgroundColor: 'white'
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        color: theme.palette.getContrastText("#3574EE"),
        backgroundColor: "#6B7280",
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
