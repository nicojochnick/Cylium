import React, {memo, useEffect} from 'react';
import TodoNode from "../Todo/todoNode"
import Box from "@material-ui/core/Box";
import {Handle} from "react-flow-renderer";
import TextField from "@material-ui/core/TextField/TextField";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import NodeEditor from "../../../Editor/NodeEditor/nodeEditor";
import {makeStyles} from "@material-ui/core";
import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Rnd } from "react-rnd";
import { BiEdit,BiRctangle, BiMove,BiChevronUp, BiChevronDown, BiText,BiChevronLeft,BiCheckboxChecked,BiListUl,BiUserCircle,BiMessageAltDetail} from "react-icons/bi";
import IconButton from "@material-ui/core/IconButton";
import TitleAndOptions from "../../NodeUtils/NodeHeaders/titleAndOptions";
let tinycolor = require("tinycolor2");


let global_bg_c = 'white';

export default function NoteNode(props) {
    const classes = useStyles();
    const [done, setDone] = React.useState(props.data.done)
    const [text, setText] = React.useState(props.data.text);
    const [textColor, setTextColor] = React.useState(props.data.textColor);
    const [backgroundColor, setBackGroundColor] = React.useState(props.data.backgroundColor)
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [size, setSize] = React.useState(props.data.size);


    const getColor = () => {
        //TODO fix hardcode
        let color = tinycolor('black');
        if (color.isDark()){
            return 'white'
        } else {
            return 'black'
        }

    };

    const handleSetEditorState = (editorState) => {
        const contentState = editorState.getCurrentContent();
        let save = JSON.stringify(convertToRaw(contentState));
        setEditorState(editorState)
        props.data.textContent = save;
        // data.save();
    };

    useEffect(() => {

        if (props.data.textContent) {
            let parsed = EditorState.createWithContent(convertFromRaw(JSON.parse(props.data.textContent)))
            setEditorState(parsed);
        }
        global_bg_c = backgroundColor;
    }, []);


    return (
        <>
            <Box
                style = {{margin: 5}}
                // border = {1}
                // borderColor = {data.color}
                display = 'flex'
                flexDirection ='column'
                justifyContent = 'flex-start'

            >
                {/*<TitleAndOptions title = {title} changeTitle = {changeTitle} handleOpenOptions = {handleOpenOptions} />*/}

                <Box
                    className={props.data.className}
                    style = {{overflow:'hidden', fontSize: 18}}
                >
                    <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    toolbarOnFocus
                    toolbarHidden
                    // readOnly = {data.className === 'nodrag' ? false : true}
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={handleSetEditorState}
                    editorStyle = {{width: props.size[0]-20, margin: 10}}
                    toolbarStyle = {{backgroundColor: 'white', zIndex: 30, boxShadow: "0px 0px 4px #C5C5C5", borderRadius: 10, marginTop:-70, width: 320, borderColor:backgroundColor, position: 'absolute', }}
                    // toolbar = {{
                    //
                    //     options: [ 'fontSize', 'list', 'colorPicker', 'link', 'emoji','history'],
                    //     colorPicker: {
                    //         className: undefined,
                    //         component: undefined,
                    //         popupClassName: undefined,
                    //         colors: ['#FFFFFF', '#000000', '#6E80EF', '#7948FB',
                    //             '#363144', '#828088', '#3CCD94', '#4F89CF', '#E56A51',
                    //             '#FA4420', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                    //             'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)']
                    //     },
                    //
                    //     inline: { inDropdown: true },
                    //     list: { inDropdown: true },
                    //     textAlign: { inDropdown: true },
                    //     link: { inDropdown: true },
                    //     history: { inDropdown: true },
                    //
                    // }}
                />


                </Box>

                {/*<Box borderLeft = {1} borderColor = {data.color} display ='flex' flexDirection = 'column ' style = {{flex:1}}>*/}
                {/*    <BiMove style = {{margin: 5, color: data.color}} size = {15} />*/}

                {/*    <IconButton onClick = {fold} style ={{margin:0, padding: 0}} >*/}
                {/*    {  isFolded*/}
                {/*        ?<BiChevronUp style = {{margin: 5, color: data.color}} size = {17} />*/}
                {/*        : <BiChevronDown  style = {{margin: 5, color: data.color}} size = {17} />*/}

                {/*    }*/}
                {/*    </IconButton>*/}


                {/*</Box>*/}
                <Handle
                    type="source"
                    id = 'k'
                    position="bottom"
                    style={{ zIndex: 12, backgroundColor: props.data.color,boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)` }}
                    // onConnect={(params) => console.log('handle onConnect', params)}
                />

            </Box>




        </>



    );
};


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

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
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    fixedHeight: {
        height: 350,
    },
    popover: {
    },

    toolbar: {
        fontSize: 12,
        backgroundColor: global_bg_c,


    }
}));


{/*<BiMove style = {{margin: 5, marginRight: 0, color: getColor()}} size = {20} />*/}


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
{/*    position="top"*/}
{/*    id="a"*/}
{/*    style={{  zIndex: 12, borderRadius: 100,boxShadow: "0px 0px 4px #C5C5C5",backgroundColor:'#5D596B' }}*/}
{/*/>*/}



{/*<TextField*/}
{/*    id="standard-basic"*/}
{/*    placeholder="add notes"*/}
{/*    multiline*/}
{/*    onChange={(event) => saveText(event)}*/}
{/*    defaultValue={text}*/}
{/*    fullWidth*/}
{/*    InputProps={{style: {fontSize: fontSize, margin: 5, color:textColor}, input: {fontSize: fontSize, backgroundColor: textColor}, disableUnderline: true,}}*/}
{/*    rowsMax={200}*/}
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



{/*<Handle*/}

{/*    type="target"*/}
{/*    position="bottom"*/}
{/*    style={{ zIndex: 12, backgroundColor: '#5D596B',boxShadow: "0px 2px 4px #C5C5C5" }}*/}
{/*    onConnect={(params) => console.log('handle onConnect', params)}*/}
{/*/>*/}


// `0px ${shadow == 8 ? '5' : '0'}px ${shadow.toString()}px rbg(205, 205, 205, 0.1)`
