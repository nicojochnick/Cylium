import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {BiLineChart,BiFilter, BiLock, BiSquareRounded} from "react-icons/bi";
import Divider from "@material-ui/core/Divider";
import { MdRoundedCorner } from "react-icons/md";


function NodeStylerBar(props) {


    const onBackGroundColorChange = () =>{


    };

    const onLockChange = () => {


    }


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
                <BiSquareRounded  style = {{color: 'white'}} size = {30}  />

            </Button>



            <Button>
                <MdRoundedCorner  style = {{color: 'white'}} size = {30}  />

            </Button>

            <Divider style = {{color:'white', backgroundColor:'white'}} orientation="vertical" flexItem />

            <Button>
                <BiLock  style = {{color: 'white'}} size = {30}  />

            </Button>




        </Box>
    );
}

export default NodeStylerBar;
