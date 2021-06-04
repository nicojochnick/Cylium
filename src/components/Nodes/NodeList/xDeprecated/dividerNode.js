import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {Rnd} from "react-rnd";



export default memo(({ data,}) => {
    const [size, setSize] = React.useState(data.size);


    const onResizeStop = (delta) => {
        let newSize = [size[0] + delta.width-8, size[1] + delta.height-8]
        setSize(newSize);
        data.size = newSize;

    };

    return (
        <>
            <div style = {{ padding: 20}}>
            <Rnd
                size={{
                    width: size[0],
                    height: size[1]
                }}
                disableDragging={true}
                onResizeStop={(event, direction, elementRef, delta) => onResizeStop(delta)}
                // className={draggable ? null : 'nodrag'}
                style={{
                    backgroundColor:'#B7B7B7',
                }}

            >
            </Rnd>
        </div>
            </>
    );
})
