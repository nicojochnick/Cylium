import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import {Handle} from "react-flow-renderer";
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField/TextField";
import { FiMoreVertical } from "react-icons/fi";
import {BiLink,BiText} from "react-icons/bi";
import InputAdornment from '@material-ui/core/InputAdornment';
import {colors} from "../../../styles/colors"



import {makeStyles} from "@material-ui/core";
import {CirclePicker} from "react-color";

export default memo(({ data,}) => {
    const classes = useStyles();
    const [shadow, setShadow ] = React.useState(8)
    const [style, setStyle] = React.useState(data.style);
    const [title, setTitle] = React.useState(data.title);
    const [link, setLink] = React.useState(data.link);
    const [editOpen, setEditOpen] = React.useState(false);
    const [color, setColor] = React.useState(data.style.backgroundColor);

    const handleEditOpen = () => {
        setEditOpen(!editOpen)
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        data.title = event.target.value;
    };

    const handleOpenOptions = (event) => {
        handleEditOpen()
    };

    const handleEditLink = (event) => {
        console.log(event);
        let link = event.target.value;
        setLink(link)

    };

    const saveOptions = () => {
        data.link = link;
        data.style.backgroundColor = color;
        data.title = title;
        handleEditOpen()
    };
    const handleChangeColor = (color) => {
        setColor(color.hex)
    };

    const handleEditTitle = (event) => {
        setTitle(event.target.value)
    };
    return (

        <Grid container>
            <Box borderRadius = {7} borderColor = {'black'} border= {0} display = 'flex' flexDirection = 'row' style = {{backgroundColor:color, color: color, overflow:'hidden', maxHeight: 45, margin: 10}}>
                <a className={classes.a} target="_blank" rel="noopener noreferrer" href = {link}>
                <Button className={classes.button} style = {{color: color}} onClick={()=> console.log('button clicked')}>
                    <TextField
                        onChange={handleTitleChange}
                        className={classes.button}
                        inputProps={{min: 0, style: { textAlign: 'center' }}} // the change is here
                        defaultValue={title}
                        value={title}
                        InputProps={{min: 0, style: { alignItems:'center', textAlign:'center', margin: 0, color:'white', }, input: {fontSize: 16, backgroundColor: 'white', textAlign:'center'}, disableUnderline: true,}}
                    />
                </Button>
                </a>
                <Box display={'flex'} flexDirection ='column' alignItems = 'center' justifyContent={'center'}>

                    <FiMoreVertical onClick={handleOpenOptions} size = {18} style = {{color:'white', margin: 8,}}/>

                </Box>
            </Box>
            {editOpen
                ?
                <Box display = 'flex' flexDirection ='column' borderRadius = {8} style = {{backgroundColor: 'white',color:'white', padding: 5}} >
                    <TextField
                        style={{padding: 2, margin: 0}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BiText style = {{marginLeft: 5, color: color}} size = {17} />
                                </InputAdornment>
                            ),
                            style: {margin: 0,padding: 0}

                        }}
                        size = 'small'
                        onChange={handleEditTitle}
                        placeholder={title}
                        variant={'outlined'}
                    />
                    <TextField
                        style={{padding: 2, margin: 0}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BiLink style = {{marginLeft: 5, color: color}} size = {17} />
                                </InputAdornment>
                            ),
                            style: {margin: 0,padding: 0}

                        }}
                        size = 'small'
                        onChange={handleEditLink}
                        placeholder={'https://example.com'}
                        variant={'outlined'}
                    />
                    <div style = {{margin: 10}} >

                    <CirclePicker
                        color={color}
                        width={200}
                        colors = {colors}
                        circleSize={12}
                        onChangeComplete={ (color) => handleChangeColor(color)}
                    />
                    </div>

                    <Button onClick={saveOptions} className={classes.button} style = {{height: 40, margin: 10, color: color,backgroundColor:color}}>
                        <p style = {{color:'white'}}>save </p>
                    </Button>
                </Box>
                : null

            }
        </Grid>
    );
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    a: {
        textDecoration:'none'

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
