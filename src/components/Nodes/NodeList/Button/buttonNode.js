import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import {Handle} from "react-flow-renderer";
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField/TextField";
import { FiMoreVertical } from "react-icons/fi";
import {BiLink,BiText,BiX} from "react-icons/bi";
import InputAdornment from '@material-ui/core/InputAdornment';
import {colors} from "../../../../styles/colors"
import {makeStyles} from "@material-ui/core";
import {CirclePicker} from "react-color";
import IconButton from "@material-ui/core/IconButton";
import IconSelector from "../../../Editor/Menus/IconMenu/iconSelector";
import {getIcon} from "../../../Editor/Menus/IconMenu/iconSelector";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";

export default memo(({ data,}) => {
    const classes = useStyles();
    const [shadow, setShadow ] = React.useState(8)
    const [style, setStyle] = React.useState(data.style);
    const [title, setTitle] = React.useState(data.title);
    const [link, setLink] = React.useState(data.link);
    const [editOpen, setEditOpen] = React.useState(false);
    const [color, setColor] = React.useState(data.style.backgroundColor);
    const [icon, setIcon] = React.useState(data.icon)
    const [isSquare, setIsSquare] = React.useState(data.isSquare);

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

    const selectIcon = (icon) => {
        setIcon(icon)
    };

    const saveOptions = () => {
        data.link = link;
        data.icon = icon;
        data.style.backgroundColor = color;
        data.title = title;
        data.isSquare = isSquare;
        handleEditOpen()
    };
    const handleChangeColor = (color) => {
        setColor(color.hex)
    };

    const handleEditTitle = (event) => {
        setTitle(event.target.value)
    };
    return (

        <Grid  style = {{zIndex: 30}} container>

            <Box borderRadius = {7} display = 'flex' flexDirection = 'row' style = {{zIndex: 50,boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`, backgroundColor:'white', overflow:'hidden', width: isSquare? 60 : 160, height: isSquare ? 60 : 45, margin: 10}}>

                <a className={classes.a} target="_blank" rel="noopener noreferrer" href = {link}>
                    <Box style = {{paddingLeft: 2,marginRight: isSquare ? -8 : 0, marginLeft: isSquare ? 5 : 0, marginTop: isSquare ? 15: 0}} display = 'flex' flexDirection = 'row' alignItems = 'center' justifyContent = 'center'>
                    {icon ? getIcon(icon, 'grey', isSquare ? 25 : 25) : null}
                    { isSquare

                        ? null
                        :<Button className={classes.button} style = {{color: color}} onClick={()=> console.log('button clicked')}>
                            <TextField
                                disabled
                                placeholder={'untitled'}
                                onChange={handleTitleChange}
                                className={classes.button}
                                inputProps={{min: 0, style: { color: '#6B9AFF', textAlign: 'center' }}} // the change is here
                                defaultValue={title}
                                value={title}
                                InputProps={{min: 0, style: { color: '#6B9AFF', alignItems:'center', textAlign:'center', margin: 0, fontWeight: 800,}, input: {fontSize: 17, fontWeight: 800, backgroundColor: 'white', textAlign:'center'}, disableUnderline: true,}}
                            />
                        </Button>

                    }

                </Box>
                </a>

                <Box display={'flex'} flexDirection ='column' alignItems = 'center' justifyContent={'center'}>
                    <IconButton style ={{margin: 0, padding:0, zIndex:20}} onClick={handleOpenOptions}>
                        <FiMoreVertical  size = {18} style = {{ margin: 8,}}/>
                    </IconButton>

                </Box>
            </Box>
            {editOpen
                ?
                <Box border = {1} display = 'flex' flexDirection ='column' borderRadius = {8} style = {{backgroundColor: 'white',color:'white', padding: 5,boxShadow: '0px 3px 8px #D3D3DA' }} >
                    <Box display = 'flex' flexDirection ='row' justifyContent = 'space-between' alignItems = 'center' >
                        <Box alignItems = 'center' display = 'flex' flexDirection ='row'>
                            <p style = {{color:'black'}}> Square? </p>
                            <Switch checked = {isSquare} onChange = {()=>setIsSquare(!isSquare)} />
                        </Box>
                        <IconButton onClick = {handleEditOpen} >
                            <BiX style = {{color: 'black'}} />
                        </IconButton>

                    </Box>

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
                        placeholder={link}
                        variant={'outlined'}
                    />

                    {/*<div style = {{margin: 10}} >*/}

                    {/*<CirclePicker*/}
                    {/*    color={color}*/}
                    {/*    width={200}*/}
                    {/*    colors = {colors}*/}
                    {/*    circleSize={12}*/}
                    {/*    onChangeComplete={ (color) => handleChangeColor(color)}*/}
                    {/*/>*/}
                    {/*</div>*/}

                    <IconSelector selectIcon = {selectIcon} />

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
