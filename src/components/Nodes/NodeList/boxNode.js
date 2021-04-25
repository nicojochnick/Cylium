import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import { Rnd } from "react-rnd";


export default memo(({ data,}) => {
    const [size, setSize] = React.useState(data.size);
    const [draggable, setDraggable] = React.useState(false)

    const onResizeStop = (delta) => {
        let newSize = [size[0] + delta.width, size[1] + delta.height]
        setSize(newSize);
        data.size = newSize;
        setDraggable(true)

    };

    useEffect (()=>{
        setDraggable(true)


    },[]);

    return (
        <div style = {{ padding: 10}}>

        <Rnd
            size={{
                width: size[0],
                height: size[1],
            }}
            onResizeStart = {()=> setDraggable(false)}
            onResizeStop={(event, direction, elementRef, delta) => onResizeStop(delta)}
            // className={draggable ? null : 'nodrag'}
            style={{
                borderRadius: 10,
                overflow: 'hidden',
                boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`,
                backgroundColor: 'white'
            }}

        >
            <Box
                display='flex'
                flexDirection='row'
                justifyContent='center'
            >

            </Box>
        </Rnd>
    </div>


    );
});

