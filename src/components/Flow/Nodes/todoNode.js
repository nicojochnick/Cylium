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
import { Scrollbars } from 'react-custom-scrollbars';
import { Rnd } from "react-rnd";
import { BiEdit,BiRectangle, BiMove, BiText,BiChevronLeft,BiCheckboxChecked,BiListUl,BiUserCircle,BiMessageAltDetail} from "react-icons/bi";
import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";


let tinycolor = require("tinycolor2");



export default memo(({ data, props}) => {
    const classes = useStyles();
    const [done, setDone] = React.useState(data.done)


    const [text, setText] = React.useState(data.text);
    const [textColor, setTextColor] = React.useState(data.textColor);
    const [backgroundColor, setBackGroundColor] = React.useState(data.backgroundColor)
    const[border, setBorder] = React.useState(data.border);
    const [shadow, setShadow ] =React.useState(8)
    const [fontSize, setFontSize] = React.useState(data.fontSize);
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty())


    const saveText = (event) => {
        setText(event.target.value)
        data.text = event.target.value;

    };
    const toggleDone = () => {
        setDone(!done);
        data.done = !data.done;
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



    const getColor = () => {
        let color = tinycolor(backgroundColor);
        if (color.isDark()){
            return 'white'
        } else {
            return 'black'
        }

    }



    useEffect(() => {
       if (data.shadow){
           setShadow(data.shadow)
       }
    }, []);



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


                <Box
                border = {border}
                borderColor = {'#5C5C5C'}
                style = {{ boxShadow: `0px ${shadow == 8 ? '5' : '0'}px ${shadow.toString()}px #D3D3DA`, padding: 3, borderRadius:7, backgroundColor: backgroundColor, }}
                display = 'flex' flexDirection ='row' justifyContent = 'center' alignItems = 'flex-start'>


                    <Box className = {'nodrag'} style={{margin: 5, padding: 2, }}>

                        <Editor
                            editorState={editorState}

                            toolbarClassName="toolbarClassName"
                            toolbarOnFocus
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={setEditorState}
                            editorStyle = {{width: 200}}
                            toolbarClassName={classes.toolbar}
                            toolbarStyle = {{backgroundColor: 'white', zIndex: 1000, boxShadow: "0px 0px 4px #C5C5C5", borderRadius: 10,  marginTop:-70, width: 315, borderColor:backgroundColor, position: 'absolute', }}
                            toolbar = {{

                                options: [ 'fontSize', 'list', 'colorPicker', 'link', 'emoji','history'],
                                colorPicker: {
                                    className: undefined,
                                    component: undefined,
                                    popupClassName: undefined,
                                    colors: ['#FFFFFF', '#000000', '#6E80EF', '#7948FB',
                                        '#363144', '#828088', '#3CCD94', '#4F89CF', '#E56A51',
                                        '#FA4420', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                                        'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)']
                                },

                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },

                            }}
                        />

                    </Box>





                {/*<TextField*/}
                {/*            id="standard-basic"*/}
                {/*            placeholder="add todo"*/}
                {/*            multiline*/}
                {/*            onChange={(event) => saveText(event)}*/}
                {/*            defaultValue={text}*/}
                {/*            fullWidth*/}
                {/*            InputProps={{style: {fontSize: fontSize, margin: 5, color:textColor}, input: {fontSize: fontSize, backgroundColor: textColor}, disableUnderline: true,}}*/}
                {/*            rowsMax={200}*/}
                {/*    />*/}


                       <Checkbox
                            checked={done}
                            style={{marginLeft: 4, color: tinycolor(backgroundColor).isDark() ? 'white' : 'black'}}
                            onChange={toggleDone}
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />


                    <Box display ='flex' flexDirection = 'column '>

                        <BiMove style = {{margin: 5, marginRight: 0, color: getColor()}} size = {15} />

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

                </Box>





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

            {/*</Rnd>*/}





        </>



    );
});


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
}));

