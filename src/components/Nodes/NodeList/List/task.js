import React from 'react';
import Box from "@material-ui/core/Box";
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Portal from "@material-ui/core/Portal";
import {BiX, BiExpand} from "react-icons/bi";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DocumentApp from "../Document/documentApp";
import {makeStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {BiDotsVerticalRounded, BiGridVertical} from "react-icons/bi";

const Color = require('color');



const Container = styled.div`
  border: 1px solid lightgrey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
  padding: 10px;
  height: 60px;
  margin-bottom: 12px;
  background-color: ${props => (props.backgroundColor.lighten(0.05))}
  
`;

function Task(props) {
    const [title, setTitle] = React.useState(props.task.title);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    // const [backgroundColor, setBackgroundColor] = React.useState(Color(data.style.bgColor));
    const [isHovering, setIsHovering] = React.useState(false);


    const classes = useStyles();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const changeTitle = (text) => {
        setTitle(text)
        props.task.title = text;
        // data.title = text
    };

    const changeContent = (content) =>{
        // setTitle(content)
        props.task.title = content
    };

    const onHoverEnter = () =>{
        setIsHovering(true)
        // setBackgroundColor(backgroundColor.lighten(0.25))

    };

    const onHoverLeave = () =>{
        setIsHovering(false)
        // setBackgroundColor(Color(data.style.bgColor))

    };

    const openMenu = (event) => {
        setAnchorElMenu(event.currentTarget);

    };

    const closeMenu = () => {
        setAnchorElMenu(null);
        onHoverLeave()

    };

    return (
        <div>
        <Draggable isDragDisabled = {props.disabled} draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (

                <Container
                    onMouseEnter={()=>onHoverEnter()}  onMouseLeave={()=>onHoverLeave()}
                    backgroundColor={props.backgroundColor}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    innerRef={provided.innerRef}
                    isDragging = {snapshot.isDragging}
                >
                    <p onClick={handleClick} style = {{color: props.backgroundColor.isDark() ? 'white' : 'black', fontWeight: 500, fontSize:18}}>
                    {props.task.title}
                    </p>

                    <Box display = 'flex' flexDirection = 'row'>
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
                            <MenuItem onClick={()=>props.deleteTask(props.column, props.task)}>Delete</MenuItem>
                            <MenuItem onClick={closeMenu}>Rename</MenuItem>
                        </Menu>
                    {/*<BiX style = {{color: props.backgroundColor.isDark() ? 'white' : 'black', margin: 5}} onClick = {()=>props.deleteTask(props.column, props.task)}/>*/}
                    {/*<BiExpand style = {{color: props.backgroundColor.isDark() ? 'white' : 'black', margin: 5}} onClick={handleClick} />*/}
                    </Box>
                </Container>

            )}

        </Draggable>

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

                <DialogContent style = {{backgroundColor: props.user.theme === 'dark' ? '#363638' : 'white' }}>
                    <Box borderRadius = {20} style = {{ backgroundColor: props.user.theme === 'dark' ? '#363638' : 'white', height: '80vh',}}>
                        <DocumentApp user = {props.user} originList = {true} changeContent = {changeContent} data = {props.task} title = {title} changeTitle = {changeTitle} />
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}

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


export default Task;
