import React from 'react';
import Box from "@material-ui/core/Box"
import Popover from "@material-ui/core/Popover/Popover";
import IconButton from '@material-ui/core/IconButton';
import { FiMoreVertical } from "react-icons/fi";
import {withStyles, makeStyles} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import { BiEdit,BiRectangle, BiText,BiCheckboxChecked,BiListUl,BiUserCircle,BiMessageAltDetail} from "react-icons/bi";
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Switch from '@material-ui/core/Switch';


import Grid from "@material-ui/core/Grid"

import { CirclePicker } from 'react-color';




function NodeEditor(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [color, setColor] = React.useState('#2ccce4');
    const [border, setBorder] = React.useState(false);

    const handleChangeComplete = (color) => {
        setColor(color.hex)
    };

    const handleOpenEditor = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const LightTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: '#565559',
            boxShadow: "0px 2px 5px #C5C5C5",
            fontSize: 14,
            borderRadius: 12,
        },
    }))(Tooltip);

    const switchBorder = () => {
        setBorder(!border)
    };




    return (
        <Box>

            <LightTooltip
                interactive
                placement={'right'}
                title = {

                    <Grid container style = {{width: 330, display:'flex'}} >

                        <Grid container alignItems={'center'} justify={'center'}>

                            <Grid item xs={2}>
                                <BiText size = {30} />

                            </Grid>
                            <Grid item xs={3}>

                                <p>Font Size</p>

                            </Grid>
                            <Grid justify={'center'} alignItems = 'center' item xs={7}>

                                <ButtonGroup variant="outline" color="primary" aria-label="contained primary button group">
                                    <Button> <p style = {{fontSize: 12}}>S</p></Button>
                                    <Button><p style = {{fontSize: 16}}>M</p></Button>
                                    <Button><p style = {{fontSize: 20}}>L</p></Button>
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
                                    color={color }
                                    width={160}
                                    circleSize={12}
                                    onChangeComplete={ handleChangeComplete }
                                />



                            </Grid>
                        </Grid>

                            <Grid style ={{marginTop: 10, border: 1, borderTop:1}} container alignItems={'center'} justify={'center'}>

                                    <Grid item xs={2}>
                                        <BiRectangle size = {30} />

                                    </Grid>
                                    <Grid item xs={3}>

                                        <p>Border</p>

                                    </Grid>
                                    <Grid justify={'center'} alignItems = 'center' item xs={7}>

                                        <ButtonGroup variant="outline" color="primary" aria-label="contained primary button group">
                                            <Button> <p style = {{fontSize: 14}}>0px</p></Button>
                                            <Button><p style = {{fontSize:14}}>1px</p></Button>
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
                                    color={color }
                                    width={160}
                                    circleSize={12}
                                    onChangeComplete={ handleChangeComplete }
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
                                    checked={border}
                                    onChange={switchBorder}
                                    name="checkedBorder"

                                />
                            </Grid>
                        </Grid>

                    </Grid>

                }
            >
                <div style = {{}}>
                    <FiMoreVertical style = {{margin: 5, marginRight: 2}} size = {15} />

                </div>

            </LightTooltip>



        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


export default NodeEditor;


{/*<IconButton aria-describedby={id} style = {{margin: 0, padding: 0}} onClick = {handleOpenEditor}>*/}
{/*    <BiEdit style ={{margin:2}} size = {19} />*/}
{/*</IconButton>*/}
