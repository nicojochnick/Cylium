import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import { Rnd } from "react-rnd";
import { BiLock,BiLockOpenAlt, BiPaint} from "react-icons/bi";
import {Handle} from "react-flow-renderer";
import NodeStylerBar from "../../../NodeUtils/nodeStylerBar";
import Avatar from "@material-ui/core/Avatar";
import NodeProfile from "../../../../Profile/Node/nodeProfile";
import {BiDotsVerticalRounded, BiGridVertical} from "react-icons/bi";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button"
import Popover from "@material-ui/core/Popover/Popover";
import {DragDropContext} from "react-beautiful-dnd";
import Column from "../List/column";
import {makeStyles} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DocumentApp from "./documentApp";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
const Color = require('color');


export default memo(({ data,}) => {
    const [size, setSize] = React.useState(data.size);
    const [isOptionOpen, setOptions] = React.useState(false);
    const [locked, setLocked] = React.useState(data.locked);
    const [barOpen, setBarOpen] = React.useState(false);
    const [isHovering, setIsHovering] = React.useState(false);
    const [background,setBackGround] = React.useState(data.style.bgColor);
    const [backgroundColor, setBackgroundColor] = React.useState(Color(data.style.bgColor));
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [title,setTitle] = React.useState(data.title);
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);


    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setBackGround('white')
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        onHoverLeave()
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const onResizeStop = (delta) => {
        let newSize = [size[0] + delta.width, size[1] + delta.height]
        setSize(newSize);
        data.size = newSize;
    };
    const nodeSelected = () =>{
        openBar();
    };
    const openBar = ()=>{
        setBarOpen(true)
    };
    const closeAll = () => {
        setBarOpen(false);
        setBarOpen(false)
    };
    const lock = () => {
        data.locked = !data.locked;
        setLocked(!locked)
    };
    const changeTitle = (text) => {
        setTitle(text);
        data.title = text
    };

    const onHoverEnter = () =>{
        setIsHovering(true)
        setBackgroundColor(backgroundColor.lighten(0.25))

    };

    const onHoverLeave = () =>{
        setIsHovering(false)
        setBackgroundColor(Color(data.style.bgColor))

    };

    const openMenu = (event) => {
        setIsMenuOpen(true)
        setAnchorElMenu(event.currentTarget);

    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setAnchorElMenu(null);
        onHoverLeave()

    };
    return (
        <Box onMouseEnter={()=>onHoverEnter()}  onMouseLeave={()=>onHoverLeave()}  border = {1} borderColor = {'lightgrey'} borderRadius = {data.style.borderRadius} style = {{width: data.size[0], height: data.size[1], shadow: data.style.shadow, backgroundColor: backgroundColor,}}>
        <Box  display={'flex'} flexDirection ='row' alignItems = 'center' justifyContet = 'flex-end' style={ {overflowX: 'hidden', margin: 5, }}>
            {/*{isHovering*/}
            {/*    ? <BiGridVertical size={25} style={{color: 'white'}}/>*/}
            {/*    : null*/}
            {/*}*/}
            <TextField
                disabled={true}
                onClick = {handleClick}
                onChange={(e)=> changeTitle(e.target.value)}
                id="standard-basic"
                placeholder="Untitled"
                value={title}
                InputProps={{style: {fontSize: 18, textTransform: 'capitalized', margin: 5, color:backgroundColor.isDark() ? 'white' : 'black'}, disableUnderline: true,}}
            />
            <Box onClick={handleClick} display = 'flex' style = {{}}>
            </Box>
            {/*<Divider/>*/}
            {/*<Box*/}
            {/*    style = {{ height: data.size[1]/20, padding:2, width: data.size[0], overflow: 'hidden', backgroundColor:'white'}}*/}
            {/*    display='flex'*/}
            {/*    flexDirection='row'*/}
            {/*>*/}
            {/*</Box>*/}
            {isHovering
                ?
                <IconButton onClick={openMenu}>
                <BiDotsVerticalRounded size={25} style={{color: 'white'}}/>
                </IconButton>
                : null
            }

            <Menu
                id="simple-menu"
                anchorEl={anchorElMenu}
                keepMounted
                open={Boolean(anchorElMenu)}
                onClose={closeMenu}
            >
                <MenuItem onClick={()=>data.delete(data.id)}>Delete</MenuItem>
                <MenuItem onClick={closeMenu}>Rename</MenuItem>
            </Menu>
        </Box>

            <Dialog
                id={id}
                open={open}
                className = {'nodrag'}
                fullWidth={true}
                maxWidth={'lg'}
                classes  = {{
                    paper: classes.pop
                }}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >

                { data.user

                ?
                    <DialogContent style = {{backgroundColor: data.user.theme === 'dark' ? '#363638' : 'white' }}>
                        <Box borderRadius = {20} style = {{ backgroundColor: data.user.theme === 'dark' ? '#363638' : 'white' , height: '80vh'}}>
                            <DocumentApp user = {data.user} data = {data} title = {title} changeTitle = {changeTitle} />
                        </Box>
                    </DialogContent>


                : null

                }



            </Dialog>

            </Box>

    );
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },


    pop: {
        boxShadow:`0px 3px 10px rgba(0, 0, 0, 0.15)`,
        // width: '80vw',
        // height: '80vh',
        // marginTop: -30,

    },



}));




{/*<Box display = 'flex' flexDirection = 'row'   >*/}
{/*    <NodeProfile changeTitle = {changeTitle}  size = 'small'  type = {data.type} title = {data.title} />*/}
{/*</Box>*/}
{/*{barOpen*/}
{/*    ?*/}
{/*    <div>*/}
{/*        {data.locked*/}
{/*            ? <BiLock onClick = {() => lock()} style={{margin: 10, color: 'grey '}} size={30}/>*/}
{/*            :  <BiLockOpenAlt onClick = {() => lock()} style={{margin: 10, color: 'grey '}} size={30}/>*/}
{/*        }*/}
{/*    </div>*/}
{/*    : null*/}
{/*}*/}
