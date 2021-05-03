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

export default memo(({ data,}) => {
    const [size, setSize] = React.useState(data.size);
    const [isOptionOpen, setOptions] = React.useState(false);
    const [locked, setLocked] = React.useState(data.locked)
    const [barOpen, setBarOpen] = React.useState(false)
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
        <Box display={'flex'} flexDirection ='row'  style={ {overflowX: 'hidden', padding: 5, margin:3, width: data.size[1], backgroundColor:'white'}}>
            <TextField
                onChange={(e)=> changeTitle(e.target.value)}
                id="standard-basic"
                placeholder="Untitled"
                value={data.title}
                InputProps={{style: {fontSize: 20, textTransform: 'capitalized', margin: 10, color:'#4B494D'}, disableUnderline: true,}}
            />
            {/*<Divider/>*/}
            {/*<Box*/}
            {/*    style = {{ height: data.size[1]/20, padding:2, width: data.size[0], overflow: 'hidden', backgroundColor:'white'}}*/}
            {/*    display='flex'*/}
            {/*    flexDirection='row'*/}
            {/*>*/}

            {/*</Box>*/}
        </Box>
    );
});


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
