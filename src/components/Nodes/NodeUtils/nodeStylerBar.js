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

    const onBackGroundColorChange = (color) =>{
        props.style.bgColor = color.hex

    };

    const handleBorderChange = (width) => {

        props.style.border = width;
    };

    const handleRadiusChange = (radius) => {
        console.log(radius);
        props.style.borderRadius = parseInt(radius);
    };

    const handleShadowChange= (strength) => {
        let shadow = null;

        if (strength === 0){
            shadow = `0px 3px 10px rgba(0, 0, 0, 0.0)`
        } else if (strength === 1) {
            shadow = `0px 3px 10px rgba(0, 0, 0, 0.15)`
        } else {
            shadow = `0px 8px 20px rgba(0, 0, 0, 0.25)`
        }

        props.style.shadow = shadow;
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
                    // value = {props.style.borderRadius}
                    placeholder={props.style.borderRadius}
                    onChange={(e)=>handleRadiusChange(e.target.value)}
                    InputProps={{style: {fontSize: 15, margin: 5, color:'white'}, disableUnderline: true,}}
                    InputLabelProps={{
                        shrink: true,
                        style : {color: 'white'}
                    }}
                />;
            case 'shadow':
                return <ButtonGroup color = 'secondary' style = {{color:'white'}} size="small" >
                    <Button onClick = {()=>handleShadowChange(0)}  variant={props.style.shadow === `0px 3px 10px rgba(0, 0, 0, 0.0)` ? 'contained' : 'outlined'} >None</Button>
                    <Button onClick = {()=>handleShadowChange(1)} variant={props.style.shadow === `0px 3px 10px rgba(0, 0, 0, 0.15)` ? 'contained' : 'outlined'} >Light</Button>
                    <Button onClick = {()=>handleShadowChange(2)} variant={props.style.shadow === `0px 8px 20px rgba(0, 0, 0, 0.25)` ? 'contained' : 'outlined'} >Heavy</Button>
                </ButtonGroup>;
            case 'border':
                return <ButtonGroup color = 'secondary'  size="small" >
                    <Button onClick = {()=>handleBorderChange(0)} variant={props.style.border === 0 ? 'contained' : 'outlined'} >0px</Button>
                    <Button onClick  = {()=>handleBorderChange(1)} variant={props.style.border === 1 ? 'contained' : 'outlined'} >1px</Button>
                    <Button onClick  = {()=>handleBorderChange(3)} variant={props.style.border === 3 ? 'contained' : 'outlined'} >3px</Button>
                </ButtonGroup>;
            case 'color':
                return<Box display = 'flex'  flexDirection={'column'} style = {{margin:0, padding: 5,}} >
                        <Button variant={'outlined'} style = {{margin: 5}} color = 'secondary'> Fill </Button>
                        <CirclePicker         onChangeComplete={ onBackGroundColorChange }
                                               circleSize = {20} circleSpacing={12} style ={{margin: 8}} colors = {["#FFFFFF", "#56565C","#212121","#9569ED","#5A7EFA","#3180FF", "8F36FC","#F17E5E","#FF2525","#77D46D","#E14D4D","#F3EFDC","#E4EBED","#FEC6EB"]}/>
                </Box>;
            default:
                return <div/>
        }
    };

    return (

        <Box
            display = ' flex'
            alignItems = 'center'
            justifyContent = 'center'
            border = {3}
            borderColor = {'white'}
             style =
                 {{
                     backgroundColor: '#343434',
                     height: 70,
                     width: 450,
                     boxShadow:`0px 3px 10px rgba(0, 0, 0, 0.15)`,
                     zIndex:100}}
             borderRadius = {10}
             flexDirection = 'row'>
            <Popover
                id={id}
                style={
                    {
                        marginTop: -50, padding: 0,
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
                <Box style = {{minWidth: 80, backgroundColor: '#343434',minHeight: 30,overflow:'hidden'}} display = ' flex' flexDirection = 'column'>
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
