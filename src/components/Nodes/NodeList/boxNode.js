import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import { Rnd } from "react-rnd";
import { BiLock,BiLockOpenAlt} from "react-icons/bi";



export default memo(({ data,}) => {
    const [size, setSize] = React.useState(data.size);
    const [isOptionOpen, setOptions] = React.useState(false);
    const [locked, setLocked] = React.useState(data.locked)

    const onResizeStop = (delta) => {
        let newSize = [size[0] + delta.width, size[1] + delta.height]
        setSize(newSize);
        data.size = newSize;

    };

    const lock = () => {
        data.locked = !data.locked
        setLocked(!locked)
    };

    console.log(isOptionOpen)


    return (
        <>
        <div
            onMouseEnter = {()=> setOptions(true)}
            onMouseLeave={()=> setOptions(false)}
            style = {{ padding: 10}}
            className={data.locked ? 'nodrag' : null}
        >


        <Rnd
            size={{
                width: size[0],
                height: size[1],
            }}
            onResizeStop={(event, direction, elementRef, delta) => onResizeStop(delta)}
            style={{
                borderRadius: 10,
                overflow: 'hidden',
                boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`,
                backgroundColor: 'white'
            }}
            disableDragging={true}

        >
            <Box
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

                    </div>
                    : null
                }

            </Box>
        </Rnd>
    </div>
            </>


    );
});

