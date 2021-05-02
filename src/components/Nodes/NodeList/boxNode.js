import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import { Rnd } from "react-rnd";
import { BiLock,BiLockOpenAlt, BiPaint} from "react-icons/bi";
import {Handle} from "react-flow-renderer";
import NodeStylerBar from "../NodeUtils/nodeStylerBar";
import Avatar from "@material-ui/core/Avatar";
import NodeProfile from "../../Profile/Node/nodeProfile";



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
        setBarOpen(false)
        setBarOpen(false)
    };

    const lock = () => {
        data.locked = !data.locked
        setLocked(!locked)
    };

    const changeTitle = (text) => {
        data.title = text
    };

    console.log(isOptionOpen)


    return (
        <>
            <Box
                style = {{margin: 40}}
                display='flex'
                flexDirection='row'
                alignItems = 'space-between'
                justifyContent = 'space-between'

            >

                <Box display = 'flex' flexDirection = 'row'>
                    <NodeProfile changeTitle = {changeTitle} title = {data.title} />
                </Box>

                {barOpen
                    ?
                    <div>
                    {data.locked
                      ? <BiLock onClick = {() => lock()} style={{margin: 10, color: 'grey '}} size={30}/>
                      :  <BiLockOpenAlt onClick = {() => lock()} style={{margin: 10, color: 'grey '}} size={30}/>
                    }
                    </div>
                    : null
                }



                <Handle
                    type="source"
                    id = 'k'
                    position="bottom"
                    style={{ zIndex: 40, backgroundColor: data.color,boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)` }}
                    // onConnect={(params) => console.log('handle onConnect', params)}
                />

            </Box>


            </>


    );
});

