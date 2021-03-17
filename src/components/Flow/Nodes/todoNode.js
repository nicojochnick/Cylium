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
import { Resizable } from "re-resizable";









export default memo(({ data,}) => {
    const classes = useStyles();


    console.log(data, )


    const [text, setText] = React.useState(data.text);
    const [done, setDone] = React.useState(data.done)

    const [textColor, setTextColor] = React.useState(data.textColor);
    const [backgroundColor, setBackGroundColor] = React.useState(data.backgroundColor)
    const[border, setBorder] = React.useState(data.border);
    const [shadow, setShadow ] =React.useState(8)
    const [fontSize, setFontSize] = React.useState(data.fontSize);

    const saveText = (event) => {
        setText(event.target.value)
        data.text = event.target.value;

    };

    const toggleDone = () => {
        setDone(!done);
        data.done = !data.done;
    }

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

    useEffect(() => {
       if (data.shadow){
           setShadow(data.shadow)
       }
    }, []);



    return (
        <>

            <Resizable
              defaultSize={{
                width:320,
                height:200,
              }}
            >
                <Box
                border = {border}
                borderColor = {'#5C5C5C'}
                style = {{ boxShadow: `0px ${shadow == 8 ? '5' : '0'}px ${shadow.toString()}px #D3D3DA`, padding: 3, borderRadius:7, backgroundColor: backgroundColor, }}
                display = 'flex' flexDirection ='row' justifyContent = 'center' alignItems = 'flex-start'>



                        <TextField
                            id="standard-basic"
                            placeholder="add todo"
                            multiline
                            onChange={(event) => saveText(event)}
                            defaultValue={text}
                            fullWidth
                            InputProps={{style: {fontSize: fontSize, margin: 5, color:textColor}, input: {fontSize: fontSize, backgroundColor: textColor}, disableUnderline: true,}}
                            rowsMax={200}
                    />


                <Checkbox
                    checked={done}
                    style ={{marginTop:5}}
                    onChange={toggleDone}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />

                <Box display ='flex' >

                    <NodeEditor
                        changeColor = {changeColor}
                        changeFont = {changeFont}
                        switchShadow = {switchShadow}
                        changeBorder = {changeBorder}
                        fontSize = {fontSize}
                        border = {data.border}
                        shadow = {data.shadow}
                        textColor = {textColor}
                        backgroundColor = {backgroundColor}

                    />

                </Box>




                <Handle
                    type="source"
                    position="top"
                    id="a"
                    style={{  borderRadius: 100,boxShadow: "0px 0px 4px #C5C5C5",backgroundColor:'#5D596B' }}
                />

                {/*<Handle*/}
                {/*    type="source"*/}
                {/*    position="left"*/}
                {/*    id="d"*/}
                {/*    style={{  borderRadius: 0, }}*/}
                {/*/>*/}


                <Handle
                    type="target"
                    position="bottom"
                    style={{ backgroundColor: '#5D596B',boxShadow: "0px 2px 4px #C5C5C5" }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                />

                {/*<Handle*/}
                {/*    type="source"*/}
                {/*    position="bottom"*/}
                {/*    id = 'c'*/}
                {/*    style={{ background: '#555' }}*/}
                {/*    onConnect={(params) => console.log('handle onConnect', params)}*/}
                {/*/>*/}

            </Box>
            </Resizable>

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

