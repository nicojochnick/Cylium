import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import { Rnd } from "react-rnd";
import { BiLock,BiLockOpenAlt, BiPaint} from "react-icons/bi";
import {Handle} from "react-flow-renderer";
import NodeStylerBar from "../NodeUtils/nodeStylerBar";



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
    }
    const openBar = ()=>{
        setBarOpen(true)
    };
    const closeAll = () => {
        setBarOpen(false)
        setBarOpen(false)
    }

    const lock = () => {
        data.locked = !data.locked
        setLocked(!locked)
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
                    <NodeStylerBar style = {{bgColor: 'blue'}} />
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

                borderRadius: 15,
                // overflow: 'hidden',
                boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`,
                backgroundColor: 'white'
            }}
            disableDragging={true}

        >
            <Box
                border =  {barOpen ? 2: 0}
                borderColor = {'#629AFC'}
                style = {{ width: size[0]+10, height: size[1]+10,}}

                display='flex'
                flexDirection='row'
                justifyContent='flex-end'

            >
                {isOptionOpen
                    ?
                    <div>
                    {data.locked
                      ? <BiLock onClick = {() => lock()} style={{margin: 10, color: 'grey '}} size={30}/>
                      :  <BiLockOpenAlt onClick = {() => lock()} style={{margin: 10, color: 'grey '}} size={30}/>
                    }
                    <BiPaint style={{margin: 10, color: 'grey '}} size={30} />

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

