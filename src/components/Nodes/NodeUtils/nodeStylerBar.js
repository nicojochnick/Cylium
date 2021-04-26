import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {BiLineChart,BiFilter, BiLock} from "react-icons/bi";

function NodeStylerBar(props) {
    return (
        <Box display = ' flex' alignItems = 'center' justifyContent = 'center' border = {3} borderColor = {'white'}  style = {{backgroundColor: '#343434', height: 60, width: 400, boxShadow:`0px 3px 10px rgba(0, 0, 0, 0.15)`}} borderRadius = {10} flexDirection = 'row'>
            <Button>

                <Box border = {2} borderRadius = {30} borderColor = {'white'} style = {{height: 23, width: 23,padding: 2, backgroundColor: props.style.bgColor}}>
                </Box>
            </Button>
            <Button>
               <BiFilter style = {{color: 'white'}} size = {30} />
            </Button>
            <Button>
                <BiLock  style = {{color: 'white'}} size = {30}  />

            </Button>


        </Box>
    );
}

export default NodeStylerBar;
