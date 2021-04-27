import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {BiLineChart,BiFilter, BiLock, BiSquareRounded} from "react-icons/bi";
import Divider from "@material-ui/core/Divider";
import { MdRoundedCorner } from "react-icons/md";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover/Popover";


function NodeStylerBar(props) {

    const [sliderOpen, setSliderOpen] = React.useState(false);

    const onBackGroundColorChange = () =>{

    };

    const onLockChange = () => {


    };


    return (

        <Box display = ' flex' alignItems = 'center' justifyContent = 'center' border = {3} borderColor = {'white'}  style = {{backgroundColor: '#343434', height: 70, width: 450, boxShadow:`0px 3px 10px rgba(0, 0, 0, 0.15)`}} borderRadius = {10} flexDirection = 'row'>

            <Tooltip title="Color" arrow placement={'top'} >

            <Button>

                <Box border = {2} borderRadius = {30} borderColor = {'white'} style = {{height: 23, width: 23,padding: 2, backgroundColor: props.style.bgColor}}>
                </Box>
            </Button>
            </Tooltip>

            <Tooltip title="Border" arrow placement={'top'} >

            <Button>
               <BiFilter style = {{color: 'white'}} size = {30} />
            </Button>

            </Tooltip>

            <Tooltip title="Shadow" arrow placement={'top'} >

            <Button>
                <BiSquareRounded  style = {{color: 'white'}} size = {30}  />

            </Button>

            </Tooltip>


            <Tooltip title="Radius" arrow placement={'top'} >
                <Button onClick = {()=>setSliderOpen(true)}>
                <MdRoundedCorner  style = {{color: 'white'}} size = {30}  />
                </Button>
            </Tooltip>


            <Divider style = {{color:'white', backgroundColor:'white'}} orientation="vertical" flexItem />

            <Tooltip title="Lockgit " arrow placement={'top'} >

            <Button>
                <BiLock  style = {{color: 'white'}} size = {30}  />
            </Button>

            </Tooltip>




        </Box>
    );
}

export default NodeStylerBar;
