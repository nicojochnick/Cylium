import Box from "@material-ui/core/Box";
import React, {memo, useEffect,} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Handle } from 'react-flow-renderer';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import NodeEditor from "../NodeEditor/nodeEditor"
import Popover from "@material-ui/core/Popover/Popover";
import Grid from "@material-ui/core/Grid";
import TimeAgo from 'react-timeago'
import { Scrollbars } from 'react-custom-scrollbars';
import { Rnd } from "react-rnd";
import {BiTimeFive, BiEdit,BiRectangle, BiMove, BiText,BiChevronLeft,BiCheckboxChecked,BiListUl,BiUserCircle,BiMessageAltDetail} from "react-icons/bi";
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import {colors} from "../../../styles/colors"
import IconButton from "@material-ui/core/IconButton";

let tinycolor = require("tinycolor2");


export default memo(({ data}) => {
    const classes = useStyles();
    const [done, setDone] = React.useState(data.done);
    const [text, setText] = React.useState(data.text);
    const [textColor, setTextColor] = React.useState(data.textColor);
    const [backgroundColor, setBackGroundColor] = React.useState(data.backgroundColor);
    const[border, setBorder] = React.useState(data.border);
    const [shadow, setShadow ] =React.useState(8);
    const [fontSize, setFontSize] = React.useState(data.fontSize);
    const [timerOptionsOpen, setTimerOptionsOpen] = React.useState(false);
    const [showTimer, setShowTimer] = React.useState(data.showTimer);
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isEditingDeadline, setIsEditingDeadline] = React.useState(false)
    const [deadline, setDeadline] = React.useState(data.deadline);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const saveText = (event) => {
        setText(event.target.value);
        data.text = event.target.value;

    };
    const toggleDone = () => {
        setDone(!done);
        data.done = !data.done;
    };
    const changeFont = (size) => {

        data.fontSize = size;
        console.log('switch!');
        setFontSize(size)

    };
    const changeColor = (color, type) =>{
        console.log('settingcolor', type)
        if (type === 'text'){
            setTextColor(color)
            data.textColor = color;
        } else {
            setBackGroundColor(color)
            data.backgroundColor = color
        }
    };
    const changeBorder = (width) => {
        setBorder(width);
        data.border = width;
        console.log('ChangingBorder', width)
    };

    const switchShadow = () =>{
        if (shadow ===  8) {
            setShadow(0);
            data.shadow = 0;
        } else if (shadow === 0){
            setShadow(8);
            data.shadow = 8
        }
    };



    const getColor = () => {
        let color = tinycolor(backgroundColor);
        if (color.isDark()){
            return 'white'
        } else {
            return 'black'
        }

    };

    const openTimerOptions = () => {
        setTimerOptionsOpen(!timerOptionsOpen)
    };

    const handleSetEditorState = (editorState) => {
        console.log('saving todo state')
        const contentState = editorState.getCurrentContent();
        let save = JSON.stringify(convertToRaw(contentState));
        setEditorState(editorState);
        data.textContent = save;
    };

    const saveDeadline = () => {
        data.deadline = deadline;
        setIsEditingDeadline(false)
        handleClose()
    };

    const handleSetDeadline = (e)=> {
        setDeadline(e.target.value);
        setIsEditingDeadline(true)

    };

    const clearDeadline = () => {
        setDeadline('');
        handleClose();
        data.deadline = '';


    };


    useEffect(() => {
       if (data.shadow){
           setShadow(data.shadow)
       }

        if (data.textContent) {
            console.log(data.textContent);
            let parsed = EditorState.createWithContent(convertFromRaw(JSON.parse(data.textContent)))
            console.log(parsed);
            setEditorState(parsed);
        }
    }, []);

    console.log('DEADLINE', deadline);



    return (
        <>

            {/*<Rnd*/}
            {/*    default={{*/}
            {/*        x: 0,*/}
            {/*        y: 0,*/}
            {/*        width: 300,*/}
            {/*        height: 50,*/}
            {/*    }}*/}
            {/*    style = {{ boxShadow: `0px ${shadow == 8 ? '5' : '0'}px ${shadow.toString()}px #D3D3DA`, padding: 3, borderRadius:7, backgroundColor: backgroundColor, }}*/}

            {/*>*/}



            <Box display = 'flex' flexDirection ='column'>




                <Box
                border = {border}
                borderColor = {'#5C5C5C'}
                style = {{ zIndex: 10, boxShadow: `0px ${shadow == 8 ? '5' : '0'}px ${shadow.toString()}px #D3D3DA`, padding: 3, borderRadius:7, backgroundColor: backgroundColor, }}
                display = 'flex' flexDirection ='row' justifyContent = 'center' alignItems = 'flex-start'>



                    <Box className = {'nodrag'} style={{marginLeft: 5, padding: 0, }}>
                        { deadline !== '' && deadline !== undefined && !done
                            ? <Box display = 'flex' flexDirection ='row' justifyContent = 'flex-end' alignItems = 'flex-start' style = {{marginTop: -40, marginBottom: 10, marginRight: -20}}>
                                <Box display = 'flex' flexDirection = 'row' alignItems = 'center' justifyContent = 'center' border = {1} borderColor = {'#7664FF'} borderRadius = {6} style = {{height: 30, paddingLeft: 10, paddingRight: 10,backgroundColor:'#7664FF'}}>
                                    <BiTimeFive style = {{margin: 5, marginRight: 0, color: 'white'}} size = {14} />
                                    <p style = {{color:'white', fontSize: 14, margin: 5}}> Due: </p><TimeAgo style = {{color:'white', fontSize: 14, margin: 5, marginRight: 8,  marginLeft: 0}} date = {data.deadline} />
                                </Box>
                            </Box>

                            : null
                        }


                        <Editor
                            editorState={editorState}

                            toolbarClassName="toolbarClassName"
                            toolbarOnFocus
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={handleSetEditorState}
                            editorStyle = {{width: 210}}
                            toolbarClassName={classes.toolbar}
                            toolbarStyle = {{backgroundColor: 'white', zIndex: 1000, boxShadow: "0px 0px 4px #C5C5C5", borderRadius: 10,  marginLeft: -22, marginTop:-70, width: 312, borderColor:backgroundColor, position: 'absolute', }}
                            toolbar = {{

                                options: [ 'fontSize', 'list', 'colorPicker', 'link', 'emoji','history'],
                                colorPicker: {
                                    className: undefined,
                                    component: undefined,
                                    popupClassName: undefined,
                                    colors: colors
                                },
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },

                            }}
                        />

                    </Box>
                       <Checkbox
                            checked={done}
                            style={{marginLeft: 4, color: tinycolor(backgroundColor).isDark() ? 'white' : 'black'}}
                            onChange={toggleDone}
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />

                    <Box display ='flex' flexDirection = 'column '>
                        <BiMove style = {{margin: 5, marginRight: 0, color: getColor()}} size = {15} />
                        <IconButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick} style ={{margin: 0, padding:0}} >
                            <BiTimeFive style = {{margin: 5, marginRight: 0, color: getColor()}} size = {15} />
                        </IconButton>

                    </Box>



                <Handle

                        type="target"
                        id = 'j'
                        position="left"
                        style={{ zIndex: 12, backgroundColor: 'grey',boxShadow: "0px 2px 4px #C5C5C5", }}
                        // onConnect={(params) => console.log('handle onConnect', params)}
                    />
                    <Handle
                        type="source"
                        position="right"
                        id="z"
                        style={{  zIndex: 12, borderRadius: 100,boxShadow: "0px 0px 4px #C5C5C5",backgroundColor:'#5D596B' }}
                    />

                    <Handle
                        type = 'target'
                        id="a"
                        position="top"
                        style={{  zIndex: 12, borderRadius: 100,boxShadow: "0px 0px 4px #C5C5C5",backgroundColor:'grey' }}
                    />
                    <Handle
                        type="source"
                        id = 'k'
                        position="bottom"
                        style={{ zIndex: 12, backgroundColor: '#5D596B',boxShadow: "0px 2px 4px #C5C5C5" }}
                        // onConnect={(params) => console.log('handle onConnect', params)}
                    />
                </Box>

                <Popover
                    style={{margin: 10, borderRadius: 20}}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    d={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                >
                    <Box display='flex' flexDirection='column' borderRadius={8}  style={{backgroundColor: 'white',  color: 'white', padding: 8, margin: 0}}>
                        <form className={classes.container} noValidate>
                            <TextField
                                onChange={(e) => handleSetDeadline(e)}
                                id="datetime-local"
                                label="Deadline"
                                size = 'small'
                                type="datetime-local"
                                defaultValue={deadline}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                        {isEditingDeadline
                            ?
                            <Button onClick={saveDeadline} className={classes.button} style = {{height: 40, margin: 10,backgroundColor:'#6172FF' }}>
                                <p style = {{color:'white'}}>save </p>
                            </Button>
                            :
                            <Button size={'small'} onClick={clearDeadline} className={classes.button} style = {{height: 30,margin: 10,backgroundColor:'#72737E' }}>
                                <p style = {{color:'white',}}>clear </p>
                            </Button>


                        }



                    </Box>
                </Popover>



            </Box>

            {/*</Rnd>*/}

        </>

    );
});


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    textField: {
        margin: 5
    },

    cont1 : {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },

    cont2 : {
        height: '100%',
        width: '100%',
        overflow: 'auto',
        paddingRight: 20,
    },
    box:{
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
    },

    fixedHeight: {
        height: 350,
    },
    popover: {
    },
}));

{/*<NodeEditor*/}
{/*    changeColor = {changeColor}*/}
{/*    changeFont = {changeFont}*/}
{/*    switchShadow = {switchShadow}*/}
{/*    changeBorder = {changeBorder}*/}
{/*    fontSize = {fontSize}*/}
{/*    border = {data.border}*/}
{/*    shadow = {data.shadow}*/}
{/*    textColor = {textColor}*/}
{/*    backgroundColor = {backgroundColor}*/}

{/*/>*/}




{/*<Handle*/}
{/*    type="source"*/}
{/*    position="left"*/}
{/*    id="d"*/}
{/*    style={{  borderRadius: 0, }}*/}
{/*/>*/}

{/*<Handle*/}
{/*    type="source"*/}
{/*    position="bottom"*/}
{/*    id = 'c'*/}
{/*    style={{ background: '#555' }}*/}
{/*    onConnect={(params) => console.log('handle onConnect', params)}*/}
{/*/>*/}
