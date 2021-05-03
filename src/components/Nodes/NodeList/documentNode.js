import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import { Rnd } from "react-rnd";
import { BiLock,BiLockOpenAlt, BiPaint} from "react-icons/bi";
import {Handle} from "react-flow-renderer";
import NodeStylerBar from "../NodeUtils/nodeStylerBar";
import Avatar from "@material-ui/core/Avatar";
import NodeProfile from "../../Profile/Node/nodeProfile";
import {BiDetail} from "react-icons/bi";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField/TextField";
import Popover from "@material-ui/core/Popover/Popover";
import {DragDropContext} from "react-beautiful-dnd";
import Column from "./KanBan/column";
import {makeStyles} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

export default memo(({ data,}) => {
    const [size, setSize] = React.useState(data.size);
    const [isOptionOpen, setOptions] = React.useState(false);
    const [locked, setLocked] = React.useState(data.locked)
    const [barOpen, setBarOpen] = React.useState(false)

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
        data.title = text
    };

    return (

        <Box border = {2} borderRadius = {5} style = {{width: 150, height: 200,backgroundColor:'white'}}>
        <Box borderRadius = {data.style.borderRadius} display={'flex'} flexDirection ='column' alignItems = 'center' justifyContet = 'flex-end' style={ {overflowX: 'hidden', padding: 5, margin:3, }}>
            <TextField
                onChange={(e)=> changeTitle(e.target.value)}
                id="standard-basic"
                placeholder="Untitled"
                value={data.title}
                InputProps={{style: {fontSize: 20, textTransform: 'capitalized', margin: 10, color:'#4B494D'}, disableUnderline: true,}}
            />
            <Box onClick={handleClick} display = 'flex' style = {{backgroundColor: 'lightblue', height: 130, width: 150}}>

            </Box>
            {/*<Divider/>*/}
            {/*<Box*/}
            {/*    style = {{ height: data.size[1]/20, padding:2, width: data.size[0], overflow: 'hidden', backgroundColor:'white'}}*/}
            {/*    display='flex'*/}
            {/*    flexDirection='row'*/}
            {/*>*/}

            {/*</Box>*/}
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

                <DialogContent>

                    <Box bordeRadius = {20} style = {{width: '80vw', height: '80vh', backgroundColor:'white'}}>


                    </Box>


                </DialogContent>







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
