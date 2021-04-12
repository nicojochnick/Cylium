import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover/Popover";
import {BiLineChart,BiDetail, BiPulse, BiRuler, BiMessageAlt, BiLink, BiCheckboxChecked, BiEdit, BiRectangle, BiText, BiUserCircle} from "react-icons/bi";


function FlowController(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Grid style = {{height: 70,}} container justify ='center' alignItems = 'center' >
            <ButtonGroup
                variant='text' color="primary" aria-label="contained primary button group">
                <IconButton  onClick={handleClick} color="secondary" aria-label="">
                    <AddIcon style = {{color:'6989FF'}} />
                </IconButton>
                {/*<Button>Two</Button>*/}
                {/*<Button>Three</Button>*/}
            </ButtonGroup>
            <Popover
                id={id}
                style ={{marginTop: 80, marginRight: 20}}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'left',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'left',
                    horizontal: 'left',
                }}
            >
                <Box display = 'flex'>
                    <ButtonGroup
                        style = {{width: 80}}
                        orientation="vertical"
                        color="primary"
                        aria-label="vertical outlined primary button group"
                    >

                        <Button onClick={()=> props.addNode('notes')}>
                            <BiMessageAlt size = {25}/>
                        </Button>
                        <Button>
                            <BiLineChart onClick={()=> props.addNode('graph')} size = {25}/>
                        </Button>
                        <Button>
                            <BiRuler onClick={()=> props.addNode('metric')} size = {25}/>
                        </Button>
                        <Button onClick={()=> props.addNode('todo')}>
                            <BiCheckboxChecked size = {27}/>
                        </Button>
                        <Button onClick={()=> props.addNode('button')}>
                            <BiLink size = {25}/>
                        </Button>
                        <Button>
                            <BiUserCircle onClick={()=> props.addNode('avatar')} size = {25}/>
                        </Button>
                    </ButtonGroup>
                </Box>
            </Popover>

        </Grid>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
export default FlowController;
