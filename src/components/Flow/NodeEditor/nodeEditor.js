import React from 'react';
import Box from "@material-ui/core/Box"
import Popover from "@material-ui/core/Popover/Popover";
import IconButton from '@material-ui/core/IconButton';
import { FiMoreVertical } from "react-icons/fi";
import {withStyles, makeStyles} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { BiEdit,BiRectangle, BiText,BiChevronLeft,BiCheckboxChecked,BiListUl,BiUserCircle,BiMessageAltDetail} from "react-icons/bi";
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Switch from '@material-ui/core/Switch';
import Tabs from '@material-ui/core/Tabs';
import Fade from '@material-ui/core/Fade';

import Tab from '@material-ui/core/Tab';


import Grid from "@material-ui/core/Grid"

import { CirclePicker } from 'react-color';


const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#FCFCFC", "black"]




function NodeEditor(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [textColor, setTextColor] = React.useState(props.textColor);
    const [backgroundColor, setbackgroundColor] = React.useState(props.backgroundColor);
    const [shadow,setShadow] = React.useState(props.shadow);
    const [openEditor, setOpenEditor] = React.useState(false);
    const [value, setValue] = React.useState(0);


    const LightTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: '#565559',
            boxShadow: "0px 2px 5px #C5C5C5",
            fontSize: 14,
            borderRadius: 12,
        },
    }))(Tooltip);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleCloseEditor = () => {
        setOpenEditor(false)

    };
    const handleOpenEditor = () => {
        setOpenEditor(true)
    };


    const switchShadow = () => {
        let blur = 0;
        if (shadow == 8){
           blur = 0
        } else {
           blur = 8;
        }
        setShadow(blur);
        props.switchShadow(blur)
    };

    const handleChangeFont = (size) => {
        props.changeFont(size)
    };

    const handleChangeColor = (color, type) => {
        console.log(color,type)
        if (type==='text')  {
           setTextColor(color.hex)
        } else {
            setbackgroundColor(color.hex)
        }
        props.changeColor(color.hex, type)
    };

    const handleBorderChange = (width) => {
        props.changeBorder(width)
    };


    return (
            <LightTooltip
                open={openEditor}
                interactive
                onClose={handleCloseEditor}
                onOpen={handleOpenEditor}

                placement={'right'}
                TransitionComponent={Fade} TransitionProps={{ timeout: 2 }}
                title = {
                    <div className={classes.root}>
                    <Grid className={classes.root} container style = {{width: 330, display:'flex'}} >
                        <Grid className={classes.root} style = {{overflow:'hidden'}} container alignItems={'center'} justify={'center'}>

                            {/*<Grid item xs={2}>*/}
                            {/*    <IconButton onClick = {handleCloseEditor}>*/}
                            {/*    <BiChevronLeft size = {35} />*/}
                            {/*    </IconButton>*/}

                            {/*</Grid>*/}
                            <Grid  alignItems={'center'} justify={'center'} style ={{width: 290}} container xs={12}>
                                <Tabs
                                    value={value}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={handleChange}
                                    centered
                                >
                                    <Tab style = {{width: 50}} label="Text" />
                                    <Tab style = {{width: 50}} label="Box" />
                                </Tabs>

                            </Grid>

                        </Grid>

                        {(value===0)

                        ?
                            <Grid container className={classes.root} style ={{paddingBottom: 5}} >
                            <Grid container alignItems={'center'} justify={'center'}>

                            <Grid item xs={2}>
                                <BiText size = {30} />

                            </Grid>
                            <Grid item xs={3}>

                                <p>Font Size</p>

                            </Grid>
                            <Grid justify={'center'} alignItems = 'center' item xs={7}>

                                <ButtonGroup variant="outline" color="primary" aria-label="contained primary button group">
                                    <Button onClick = {()=>handleChangeFont(13)}> <p style = {{fontSize: 13,color: props.fontSize == 13 ? 'black' : 'grey'}}>S</p></Button>
                                    <Button onClick = {()=>handleChangeFont(16)}>  <p style = {{fontSize: 16, color: props.fontSize == 16 ? 'black' : 'grey'}}>M</p></Button>
                                    <Button onClick = {()=>handleChangeFont(25)} ><p style = {{fontSize: 25, color: props.fontSize == 25 ? 'black' : 'grey' }}>L</p></Button>
                                </ButtonGroup>


                            </Grid>
                        </Grid>

                        <Grid style = {{}} container alignItems={'center'} justify={'center'}>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={3}>

                                <p>Color</p>

                            </Grid>
                            <Grid justify={'center'} alignItems = 'center' item xs={7}>

                                <CirclePicker
                                    color={textColor }
                                    colors = { colors
                                    }

                                    width={160}
                                    circleSize={12}
                                    onChangeComplete={ (color) => handleChangeColor(color, 'text')}
                                />



                            </Grid>
                        </Grid>
                            </Grid>

                           :

                            <Grid container className={classes.root} >



                            <Grid style ={{marginTop: 10, border: 1, borderTop:1}} container alignItems={'center'} justify={'center'}>

                                    <Grid item xs={2}>
                                        <BiRectangle size = {30} />

                                    </Grid>
                                    <Grid item xs={3}>

                                        <p>Border</p>

                                    </Grid>
                                    <Grid justify={'center'} alignItems = 'center' item xs={7}>

                                        <ButtonGroup variant="outline" color="primary" aria-label="contained primary button group">
                                            <Button onClick = {() => handleBorderChange(0)}> <p style = {{fontSize: 14}}>0px</p></Button>
                                            <Button onClick = {() => handleBorderChange(1)} ><p style = {{fontSize:14}}>1px</p></Button>
                                        </ButtonGroup>

                                    </Grid>

                            </Grid>


                        <Grid style = {{}} container  justify={'center'}>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={3}>
                                <p>Color</p>
                            </Grid>
                            <Grid justify={'center'} alignItems = 'center' item xs={7}>
                                <CirclePicker
                                    color={backgroundColor}
                                    width={160}
                                    colors = {colors}
                                    circleSize={12}
                                    onChangeComplete={ (color) => handleChangeColor(color, 'background')}
                                />
                            </Grid>
                        </Grid>
                        <Grid style = {{marginTop: 8}}  container  justify={'center'}>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={3}>
                                <p>Shadow</p>

                            </Grid>
                            <Grid  justifyContent ='center' justify ='center' alignItems = 'center' container xs={7}>

                                <Switch
                                    checked={props.shadow === 8}
                                    onChange={switchShadow}
                                    name="checkedBorder"

                                />
                            </Grid>
                        </Grid>
                            </Grid>
                            }


                    </Grid>

                    </div>

                }
            >
                <div style = {{}}>
                    <FiMoreVertical style = {{margin: 5, marginRight: 2}} size = {15} />

                </div>

            </LightTooltip>



    );
}

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    root: {
        flexGrow: 1,
        display:'flex',
    },

}));


export default NodeEditor;


{/*<IconButton aria-describedby={id} style = {{margin: 0, padding: 0}} onClick = {handleOpenEditor}>*/}
{/*    <BiEdit style ={{margin:2}} size = {19} />*/}
{/*</IconButton>*/}
