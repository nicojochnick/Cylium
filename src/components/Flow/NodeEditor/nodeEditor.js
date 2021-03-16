import React from 'react';
import Box from "@material-ui/core/Box"
import Popover from "@material-ui/core/Popover/Popover";
import IconButton from '@material-ui/core/IconButton';
import { FiMoreVertical } from "react-icons/fi";
import {withStyles, makeStyles} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {BiEdit} from "react-icons/bi"
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid"



function NodeEditor(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

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
            boxShadow: "0px 0px 4px #C5C5C5",
            fontSize: 14,
            borderRadius: 3,
        },
    }))(Tooltip);




    return (
        <Box>

            <LightTooltip
                interactive
                placement={'right'}
                title = {


                    <Grid container style = {{width: 330}} >

                        <Grid item xs={4}>
                            hi

                        </Grid>
                        <Grid item xs={4}>

                            there

                        </Grid>
                        <Grid item xs={4}>

                            nico

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
