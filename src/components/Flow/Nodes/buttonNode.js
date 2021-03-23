import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import {Handle} from "react-flow-renderer";
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField/TextField";

import {makeStyles} from "@material-ui/core";

export default memo(({ data,}) => {
    const classes = useStyles();
    const [shadow, setShadow ] = React.useState(8)
    const [style, setStyle] = React.useState(data.style);
    console.log('BUTTON')

    return (
            <Box display = 'flex' flexDirection = 'row' style = {{}}>
                <Button className={classes.button} style = {{color: data.style.backgroundColor,backgroundColor: data.style.backgroundColor}} onClick={()=> console.log('button clicked')}>
                    <TextField
                        className={classes.button}
                        inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
                        defaultValue={data.title}
                        InputProps={{min: 0, style: { alignItems:'center', textAlign:'center', margin: 0, color:'white', }, input: {fontSize: 16, backgroundColor: 'white', textAlign:'center'}, disableUnderline: true,}}
                    />
                </Button>
            </Box>
    );
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        textTransform: 'none',
        borderRadius: 6,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    margin: {
        margin: theme.spacing(1),
        color: "white"
    },
    input: {
        color: "white"
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));
