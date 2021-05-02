import React, {memo, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { Handle } from 'react-flow-renderer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Box from "@material-ui/core/Box";
import NodeEditor from "../../Editor/nodeEditor";
import {colors} from "../../../styles/colors";
import {Editor} from "react-draft-wysiwyg";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import IconButton from "@material-ui/core/IconButton";
import {BiMove} from "react-icons/bi";




export default memo(({ data, style }) => {
    const classes = useStyles();
    const [text, setText] = React.useState(data.text);
    const [textColor, setTextColor] = React.useState(data.textColor);
    const [backgroundColor, setBackGroundColor] = React.useState(data.backgroundColor)
    const[border, setBorder] = React.useState(0);
    const [shadow, setShadow ] =React.useState(8);
    const [size, setSize] = React.useState(data.size);

    const [fontSize, setFontSize] = React.useState(data.fontSize);
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());


    const saveText = (event) => {
        setText(event.target.value);
        data.text = event.target.value;

    };

    const changeFont = (size) => {

        data.fontSize = size
        console.log('switch!')
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

    const handleSetEditorState = (editorState) => {
        console.log('saving todo state')
        const contentState = editorState.getCurrentContent();
        let save = JSON.stringify(convertToRaw(contentState));
        setEditorState(editorState);
        data.textContent = save;
    };

    const mouseEnter = () => {
        setBorder(1)
    };

    const mouseLeave = () => {
        setBorder(0)
    };

    useEffect(() => {
        if (data.shadow){
            setShadow(data.shadow)
        }
        if (data.textContent) {
            let parsed = EditorState.createWithContent(convertFromRaw(JSON.parse(data.textContent)))
            setEditorState(parsed);
        }
    }, []);

    return (
        <>

            <Box   className={data.className}   style={{ overflow:'hidden', margin: 3, fontSize: 18}}>
            <Editor

                editorState={editorState}
                toolbarClassName="toolbarClassName"
                placeholder = {'add text'}
                toolbarOnFocus
                toolbarHidden
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleSetEditorState}
                editorStyle = {{width: size[0]-10, }}
                toolbarClassName={classes.toolbar}
                // toolbarStyle = {{backgroundColor: 'white', zIndex: 1000, boxShadow: "0px 0px 4px #C5C5C5", borderRadius: 10,  marginLeft: -22, marginTop:-70, width: 312, borderColor:backgroundColor, position: 'absolute', }}
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

            {/*<Box display ='flex' flexDirection = 'column '>*/}
            {/*    <BiMove style = {{margin: 5, marginRight: 0, color: 'black'}} size = {15} />*/}

            {/*</Box>*/}



            </>


    );
});

const useStyles = makeStyles((theme) => ({

}));



{/*<Handle*/}
{/*    type="source"*/}
{/*    position="top"*/}
{/*    id="a"*/}
{/*    style={{  borderRadius: 100, backgroundColor:'red' }}*/}
{/*/>*/}

{/*<Handle*/}
{/*    type="source"*/}
{/*    position="left"*/}
{/*    id="d"*/}
{/*    style={{  borderRadius: 0, }}*/}
{/*/>*/}


{/*<Handle*/}
{/*    type="target"*/}
{/*    position="bottom"*/}
{/*    style={{ backgroundColor: 'blue' }}*/}
{/*    onConnect={(params) => console.log('handle onConnect', params)}*/}
{/*/>*/}

{/*<Handle*/}
{/*    type="source"*/}
{/*    position="bottom"*/}
{/*    id = 'c'*/}
{/*    style={{ background: '#555' }}*/}
{/*    onConnect={(params) => console.log('handle onConnect', params)}*/}
{/*/>*/}





{/*<Box display ='flex' style ={{marginTop: 8}} >*/}

{/*    <NodeEditor*/}
{/*        changeColor = {changeColor}*/}
{/*        changeFont = {changeFont}*/}
{/*        switchShadow = {switchShadow}*/}
{/*        changeBorder = {changeBorder}*/}
{/*        fontSize = {fontSize}*/}
{/*        border = {data.border}*/}
{/*        shadow = {data.shadow}*/}
{/*        textColor = {textColor}*/}
{/*        textOnly = {true}*/}
{/*        backgroundColor = {backgroundColor}*/}

{/*    />*/}

{/*</Box>*/}






{/*<TextField*/}
{/*    id="standard-basic"*/}
{/*    placeholder="Add Label"*/}
{/*    multiline*/}
{/*    onChange={(event) => saveText(event)}*/}
{/*    defaultValue={text}*/}
{/*    style={{fontSize: 10}}*/}
{/*    fullWidth*/}
{/*    InputProps={{style: {fontSize: 20, margin: 5,color:'black'}, disableUnderline: true,}}*/}
{/*    rowsMax={10}*/}
{/*/>*/}
