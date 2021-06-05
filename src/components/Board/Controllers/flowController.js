import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover/Popover";
import {BsCardText, BsCardHeading, BsCardList, BsFileSpreadsheet, BsFileText, BsKanban, BsWindow} from "react-icons/bs"
import {BiLineChart, BiBrain, BiFile, BiData, BiFolder,BiSpreadsheet,BiNote, BiCubeAlt, BiTable, BiDetail, BiPencil, BiRuler, BiMessageAlt, BiLink, BiCheckboxChecked, BiEdit, BiMenu, BiText, BiUserCircle} from "react-icons/bi";
import Divider from "@material-ui/core/Divider";
import {IoMdHand} from "react-icons/all";



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
        <Grid style = {{height: 180}} container justify ='center' alignItems = 'center' >
            <Box borderRadius = {100} display = 'flex' flexDirection ='column' style = {{boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.20)`, padding: 10, overflow:'hidden', color: props.user.theme === 'dark' ? 'white' : '#363638', backgroundColor:props.user.theme === 'light' ? 'white' : '#363638'}}>
                <Box  display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 10,}} >
                    <IoMdHand onClick={()=> props.setIsAdding(false)}  style = {{color: props.isAdding ? 'black' :  '#5967FF'}} size = {28}/>
                </Box>
                <Box onClick={()=>props.setIsAdding(true)} display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 10,}} onDragStart={(event) => onDragStart(event, 'thought')} draggable>
                    <BiBrain style = {{color: !props.isAdding ? 'black' :  '#5967FF', }} size = {28}/>
                </Box>
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

{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'boxfront')} draggable   >*/}
{/*    <BiRectangle style = {{backgroundColor:'black', borderRadius: 5}} size = {22}/>*/}
{/*</Box>*/}

{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'metric')} draggable   >*/}
{/*    <BiRuler size = {25}/>*/}
{/*</Box>*/}

{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'divider')} draggable   >*/}
{/*    <BiMinus   size = {25}/>*/}
{/*</Box>*/}
{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'button')} draggable   >*/}
{/*    <BiLink size = {25}/>*/}
{/*</Box>*/}
{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'avatar')} draggable   >*/}
{/*<BiUserCircle   size = {25}/>*/}
{/*</Box>*/}
{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'todo')} draggable   >*/}
{/*    <BiCheckboxChecked size = {27}/>*/}
{/*</Box>*/}
{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'graph')} draggable   >*/}
{/*    <BiLineChart   size = {25}/>*/}
{/*</Box>*/}



{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 10,}} onDragStart={(event) => onDragStart(event, 'box')} draggable   >*/}
{/*    <BsWindow size = {25}/>*/}
{/*</Box>*/}
{/*<Divider/>*/}



{/*<Box  display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'label')} draggable   >*/}
{/*    <BiText size = {25}/>*/}
{/*</Box>*/}
{/*<Divider/>*/}
{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 10,}} onDragStart={(event) => onDragStart(event, 'document')} draggable   >*/}
{/*    <BsFileText  size = {25}/>*/}
{/*</Box>*/}
{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'folder')} draggable   >*/}
{/*    <BiFolder size = {23}/>*/}
{/*</Box>*/}
{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 10,}} onDragStart={(event) => onDragStart(event, 'kanban')} draggable   >*/}
{/*    <BsCardList size = {25}/>*/}
{/*</Box>*/}
{/*<Box display = 'flex' alignItems = 'center' justifyContent = 'center' style = {{margin: 8,}} onDragStart={(event) => onDragStart(event, 'table')} draggable   >*/}
{/*    <BiData  size = {23}/>*/}
{/*</Box>*/}