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
        <div
            onMouseEnter = {()=> setOptions(true)}
            onMouseLeave={()=> closeAll()}
            onClick = {()=>nodeSelected()}
            style = {{ padding: 10, width: size[0]+10, height: size[1]+10,}}
            className={data.locked ? 'nodrag' : null}
        >

            <Box style = {{width: size[0]}} display = 'flex' flexDirection = 'row' justifyContent = 'center'>

                {barOpen
                ?
                <div style = {{marginTop: -90}}>
                    <NodeStylerBar locked = {data.locked} style = {data.style} />
                </div>
                : null

            }

            </Box>


        <Rnd
            size={{
                width: size[0],
                height: size[1],
            }}
            onResizeStop={(event, direction, elementRef, delta) => onResizeStop(delta)}
            style={{
                margin: 4,
                borderRadius: data.style.borderRadius,
                // overflow: 'hidden',
                boxShadow: data.style.shadow,
                backgroundColor: data.style.bgColor,
            }}
            disableDragging={true}

        >
            <Box
                border =  {barOpen ? 2: data.style.border}
                borderRadius = {data.style.borderRadius}
                borderColor = {barOpen ? '#268CFF': '#6E6E6E'}
                style = {{ width: size[0], height: size[1], padding: 40}}
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


        </Rnd>
    </div>
            </>


    );
});

