import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover/Popover";
import {BiLineChart,BiDetail, BiPulse, BiRuler, BiMessageAlt, BiLink, BiCheckboxChecked, BiEdit, BiRectangle, BiText, BiUserCircle} from "react-icons/bi";


function FlowController(props) {
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

    return (
        <Grid style = {{height: 70,}} container justify ='center' alignItems = 'center' >
            <ButtonGroup
                variant='text' color="primary" aria-label="contained primary button group">
                <IconButton  onClick={handleClick} color="secondary" aria-label="">
                    <AddIcon style = {{color:props.color, height: 30, width: 30}} />
                </IconButton>
                {/*<Button>Two</Button>*/}
                {/*<Button>Three</Button>*/}
            </ButtonGroup>
            <Popover
                id={id}
                style ={{marginTop: 80, marginRight: 15}}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'left',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'left',
                    horizontal: 'left',
                }}
            >
                <Box border = {2} borderRadius = {5} borderColor = {props.color} display = 'flex' style = {{padding: -5, overflow:'hidden'}}>
                    <ButtonGroup
                        style = {{width: 80, color: props.color, borderColor: props.color, margin: -2, overflow:'hidden'}}
                        orientation="vertical"
                        color = {props.color}
                        aria-label="vertical outlined primary button group"
                    >

                        <Button onClick={()=> props.addNode('notes')}>
                            <BiMessageAlt style = {{color: props.color}} size = {25}/>
                        </Button>
                        <Button>
                            <BiLineChart  style = {{color: props.color}}  onClick={()=> props.addNode('graph')} size = {25}/>
                        </Button>
                        <Button>
                            <BiRuler  style = {{color: props.color}}  onClick={()=> props.addNode('metric')} size = {25}/>
                        </Button>
                        <Button  style = {{color: props.color}}  onClick={()=> props.addNode('todo')}>
                            <BiCheckboxChecked size = {27}/>
                        </Button>
                        <Button  style = {{color: props.color}}  onClick={()=> props.addNode('button')}>
                            <BiLink size = {25}/>
                        </Button>
                        <Button>
                            <BiUserCircle  style = {{color: props.color}}  onClick={()=> props.addNode('avatar')} size = {25}/>
                        </Button>
                    </ButtonGroup>
                </Box>
            </Popover>

        </Grid>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
export default FlowController;
