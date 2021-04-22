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
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Grid style = {{height: 60,}} container justify ='center' alignItems = 'center' >
                <Box borderRadius = {20} display = 'flex' flexDirection ='column' style = {{boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.10)`, paddingTop: 10, overflow:'hidden', backgroundColor: 'white'}}>
                        <Box  display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'notes')} draggable   >
                            <BiMessageAlt size = {25}/>
                        </Box>
                        <Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'input')} draggable   >
                        <BiLineChart   size = {25}/>
                        </Box>
                        <Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'input')} draggable   >
                            <BiRuler  style = {{color: props.color}}  onClick={()=> props.addNode('metric')} size = {25}/>
                        </Box>
                        <Button  style = {{color: props.color}}  onClick={()=> props.addNode('todo')}>
                            <BiCheckboxChecked size = {27}/>
                        </Button>
                        <Button  style = {{color: props.color}}  onClick={()=> props.addNode('button')}>
                            <BiLink size = {25}/>
                        </Button>
                        <Button>
                            <BiUserCircle  style = {{color: props.color}}  onClick={()=> props.addNode('avatar')} size = {25}/>
                        </Button>


                </Box>

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


{/*<Popover*/}
{/*    id={id}*/}
{/*    style ={{marginTop: 80, marginRight: 15}}*/}
{/*    open={open}*/}
{/*    anchorEl={anchorEl}*/}
{/*    onClose={handleClose}*/}
{/*    anchorOrigin={{*/}
{/*        vertical: 'left',*/}
{/*        horizontal: 'left',*/}
{/*    }}*/}
{/*    transformOrigin={{*/}
{/*        vertical: 'left',*/}
{/*        horizontal: 'left',*/}
{/*    }}*/}
{/*>*/}

//
// <ButtonGroup
//     variant='text' color="primary" aria-label="contained primary button group">
//     <IconButton  onClick={handleClick} color="secondary" aria-label="">
//         <AddIcon style = {{color:props.color, height: 24, width: 24}} />
//     </IconButton>
//     {/*<Button>Two</Button>*/}
//     {/*<Button>Three</Button>*/}
// </ButtonGroup>
