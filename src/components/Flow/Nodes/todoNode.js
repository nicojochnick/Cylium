import Box from "@material-ui/core/Box";
import React, { memo } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Handle } from 'react-flow-renderer';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import NodeEditor from "../NodeEditor/nodeEditor"
import Popover from "@material-ui/core/Popover/Popover";



export default memo(({ data }) => {

    const [text, setText] = React.useState(data.text);
    const [done, setDone] = React.useState(data.done)

    const saveText = (event) => {
        setText(event.target.value)
        data.text = event.target.value;

    };

    const toggleDone = () => {
        setDone(!done);
        data.done = !data.done;
    }





    return (
        <>

            <Box display = 'flex' flexDirection ='row' justifyContent = 'center' alignItems = 'flex-start'>

            <TextField
                    id="standard-basic"
                    placeholder="add todo"
                    multiline
                    onChange={(event) => saveText(event)}
                    defaultValue={text}
                    style={{fontSize: 10, margin: 5}}
                    fullWidth
                    InputProps={{style: {fontSize: 15, margin: 5,}, disableUnderline: true,}}
                    rowsMax={5}
                />
                <Checkbox
                    checked={done}
                    style ={{marginTop:5}}
                    onChange={toggleDone}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />

                <Box display ='flex' >

                    <NodeEditor/>



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

        </>



    );
});
