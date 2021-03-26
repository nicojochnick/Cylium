import React, {memo, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { Handle } from 'react-flow-renderer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Box from "@material-ui/core/Box";
import NodeEditor from "../NodeEditor/nodeEditor";
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
    const[border, setBorder] = React.useState(data.border);
    const [shadow, setShadow ] =React.useState(8)
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

    console.log(editorState);


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

        <Box
            border = {editorState.getCurrentContent().hasText()? 0 : 1}
            borderColor = {'#5C5C5C'}
            style = {{padding: 5}}
            display = 'flex'
            flexDirection ='row'
            justify = 'center'
            alignItems = 'flex-start'>

            <Box className = {'nodrag'} style={{ }}>



            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                toolbarOnFocus
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleSetEditorState}
                editorStyle = {{minWidth: 20}}
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

            <Box display ='flex' flexDirection = 'column '>
                <BiMove style = {{margin: 5, marginRight: 0, color: 'black'}} size = {15} />

            </Box>



        </Box>
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
