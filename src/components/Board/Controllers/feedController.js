import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import {BiChat} from "react-icons/bi";


function FeedController(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Grid style={{height: 70,}} container justify='center' alignItems='center'>
            <ButtonGroup
                variant='text' color="primary" aria-label="contained primary button group">
                <IconButton onClick={() => props.openChat()} color="secondary" aria-label="">
                    <BiChat style={{color: '6989FF'}}/>
                </IconButton>
                {/*<Button>Two</Button>*/}
                {/*<Button>Three</Button>*/}
            </ButtonGroup>
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

export default FeedController
