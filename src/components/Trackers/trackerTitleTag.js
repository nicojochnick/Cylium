import React from 'react';
import Box from "@material-ui/core/Box";
import {BiHappy} from 'react-icons/bi'
import Popover from '@material-ui/core/Popover';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import {BiPencil,BiUser, BiCog,BiBarChartAlt2} from "react-icons/bi"
import TextField from '@material-ui/core/TextField';
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import {TwitterPicker} from "react-color";

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

    }


    return (
        <Box borderBottom = {1} borderColor= {"white"} display="flex" justifyContent = 'space-between' alignItems = 'center' flexDirection="row" borderRadius = {0} borderBottom = {0} style = {{backgroundColor: props.backgroundColor, padding: 10, height: 60, width: '100%'}}>
            <Grid container direction={'row'}>

            {/*<BiHappy size = {25} style = {{color: "white"}} />*/}

                <TextField
                    value = {props.trackerTitle}
                    style = {{color: '#FAFAFA', margin: 5}}
                    InputProps={{
                        className: classes.input
                    }}
                    className={classes.margin}
                    // onChange={e => props.handleTitleChange(e.target.value)}

                />

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
                    <Box>
                        <p> Highlight Color </p>
                        <TwitterPicker
                            color={ 'white'}
                        />
                    </Box>
                </Popover>


            </Grid>



            <Grid justify = "flex-end" container direction = "row">
                <Box style ={{marginRight: 10}} border = {1} borderColor = "white" borderRadius = {100}>
                    <IconButton color = "white" onClick={()=>props.switchCreating()}>
                        <BiUser style = {{color: "white"}} size = {20} />
                    </IconButton>
                </Box>

                <Box style ={{marginRight: 10}} border = {1} borderColor = "white" borderRadius = {100}>
                    <IconButton color = "white" onClick={()=>props.switchData()}>
                        <BiBarChartAlt2 style = {{color: "white"}} size = {20} />
                    </IconButton>
                </Box>

                <Box border = {1} style = {{backgroundColor: "white"}} borderColor = "white" borderRadius = {100}>
                <IconButton color = "white" onClick={()=>props.switchPosting()}>
                    <BiPencil style = {{color: props.backgroundColor}} size = {20} />
                </IconButton>
                </Box>

            </Grid>

            {/*<Button style = {{margin: 10, paddingBottom: 0, paddingTop: 0,}} onClick={()=>props.switchPosting()} variant="contained" color="primary">*/}
            {/*    {(!props.isPosting) ? <p> Create Post </p> : <p> Delete Post </p>}*/}
            {/*</Button>*/}
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
