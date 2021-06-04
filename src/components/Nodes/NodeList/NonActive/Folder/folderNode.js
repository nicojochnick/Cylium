import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import {Handle} from "react-flow-renderer";

import {makeStyles} from "@material-ui/core";
import folder from "../../../../../assets/images/folder.png"





export default memo(({ data,}) => {
    const [border, setBorder] = React.useState(0);

    const handleDragLeave = event => {
        event.preventDefault()
        console.log('stopped')

        event.stopPropagation();
        setBorder(0)
    };
    const handleDragOver = event => {
        event.preventDefault()
        event.stopPropagation();
    };
    const handleDragEnter = event => {
        event.preventDefault()

        event.stopPropagation();

        setBorder(1);
        console.log('draggedover')
    };

    return (
            <Box onMouseLeave={handleDragLeave} onMouseEnter={handleDragOver} onMouseOver = {handleDragEnter} onDragOver={handleDragEnter} onDragEnter={handleDragEnter}  border = {border} style = {{padding: 10}}>
                <img style = {{height: 100,pointerEvents:'none' }} src = {folder}/>
            </Box>


    )}
)

