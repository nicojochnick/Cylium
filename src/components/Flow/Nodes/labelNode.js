import React, {memo, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { Handle } from 'react-flow-renderer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Box from "@material-ui/core/Box";
import NodeEditor from "../NodeEditor/nodeEditor";



export default memo(({ data, style }) => {

    const [text, setText] = React.useState(data.text);
    const [textColor, setTextColor] = React.useState(data.textColor);
    const [backgroundColor, setBackGroundColor] = React.useState(data.backgroundColor)
    const[border, setBorder] = React.useState(data.border);
    const [shadow, setShadow ] =React.useState(8)
    const [fontSize, setFontSize] = React.useState(data.fontSize);

    const saveText = (event) => {
        setText(event.target.value)
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

    useEffect(() => {
        if (data.shadow){
            setShadow(data.shadow)
        }
    }, []);

    return (
        <>

        <Box
            border = {border}
            borderColor = {'#5C5C5C'}
            display = 'flex'
            flexDirection ='row'
            justify = 'center'
            alignItems = 'flex-start'>


            <TextField
                id="standard-basic"
                placeholder="Add Label"
                multiline
                onChange={(event) => saveText(event)}
                defaultValue={text}
                style={{fontSize: 10}}
                fullWidth
                InputProps={{style: {fontSize: 20, margin: 5,color:'black'}, disableUnderline: true,}}
                rowsMax={10}
            />


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





        </Box>
            </>


    );
});

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
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
