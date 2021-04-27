import React, {memo, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {BiLineChart,BiFilter, BiLock, BiSquareRounded} from "react-icons/bi";
import Divider from "@material-ui/core/Divider";
import { MdRoundedCorner } from "react-icons/md";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover/Popover";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { CirclePicker } from 'react-color';



function NodeStylerBar(props) {

    const [sliderOpen, setSliderOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [option,setOption] = React.useState(null)

    const handleOpenOption = (event, option) => {
        setAnchorEl(event.currentTarget);
        setOption(option)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onBackGroundColorChange = () =>{

    };

    const onLockChange = () => {


    };

    function valuetext(value) {
        return `${value}`;
    }

    const renderSelect = (option ) => {

        switch (option) {


            case  'radius':
                return <TextField
                    id="standard-number"
                    type="number"
                    InputProps={{style: {fontSize: 15, margin: 5, color:'white'}, disableUnderline: true,}}
                    InputLabelProps={{
                        shrink: true,
                        style : {color: 'white'}
                    }}
                />;
            case 'shadow':
                return <ButtonGroup size="small" >
                    <Button>None</Button>
                    <Button>Light</Button>
                    <Button>Heavy</Button>
                </ButtonGroup>;

            case 'border':
                return <ButtonGroup size="small" >
                    <Button>0px</Button>
                    <Button>1px</Button>
                    <Button>3px</Button>
                </ButtonGroup>;

            case 'color':
                return<Box display={'flex'} flexDirection = 'column'>
                        <Button>Fill</Button>
                        <CirclePicker/>
                </Box>;
            default:
                return <div/>
        }


    };


    return (

        <Box display = ' flex' alignItems = 'center' justifyContent = 'center' border = {3} borderColor = {'white'}  style = {{backgroundColor: '#343434', height: 70, width: 450, boxShadow:`0px 3px 10px rgba(0, 0, 0, 0.15)`}} borderRadius = {10} flexDirection = 'row'>
            <Popover
                id={id}
                style={
                    {
                        marginTop: -75,
                    }
                }
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >

                <Box style = {{minWidth: 80, backgroundColor: '#343434',minHeight: 30, padding: 4}} display = ' flex' alignItems = 'center' justifyContent = 'center'  flexDirection = 'row'>
                    {renderSelect(option)}
                </Box>



            </Popover>
            <Tooltip title="Color" arrow placement={'top'} >

            <Button onClick = {(e)=>handleOpenOption(e,'color')}>

                <Box border = {2} borderRadius = {30} borderColor = {'white'} style = {{height: 23, width: 23,padding: 2, backgroundColor: props.style.bgColor}}>
                </Box>
            </Button>
            </Tooltip>

            <Tooltip title="Border" arrow placement={'top'} >

            <Button onClick = {(e)=>handleOpenOption(e,'border')}>
               <BiFilter style = {{color: 'white'}} size = {30} />
            </Button>

            </Tooltip>

            <Tooltip title="Shadow" arrow placement={'top'} >

            <Button onClick = {(e)=>handleOpenOption(e,'shadow')} >
                <BiSquareRounded  style = {{color: 'white'}} size = {30}  />

            </Button>

            </Tooltip>


            <Tooltip title="Radius" arrow placement={'top'} >
                <Button onClick = {(e)=>handleOpenOption(e,'radius')}>
                <MdRoundedCorner  style = {{color: 'white'}} size = {30}  />
                </Button>
            </Tooltip>


            <Divider style = {{color:'white', backgroundColor:'white'}} orientation="vertical" flexItem />

            <Tooltip title="Lock " arrow placement={'top'} >

            <Button>
                <BiLock  style = {{color: 'white'}} size = {30}  />
            </Button>

            </Tooltip>




        </Box>
    );
}

export default NodeStylerBar;
