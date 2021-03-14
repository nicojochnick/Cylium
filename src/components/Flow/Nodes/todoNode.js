import Box from "@material-ui/core/Box";
import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import { Handle } from 'react-flow-renderer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';



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

            <Box display = 'flex' flexDirection ='row' justifyContent = 'center' alignItems = 'center'>


                <TextField
                    id="standard-basic"
                    placeholder="add todo"
                    multiline
                    onChange={(event) => saveText(event)}
                    defaultValue={text}
                    style={{fontSize: 10}}
                    fullWidth
                    InputProps={{style: {fontSize: 15, margin: 5,}, disableUnderline: true,}}
                    rowsMax={5}
                />
                <Checkbox
                    checked={done}
                    style ={{margin:5}}
                    onChange={toggleDone}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />



                <Handle
                    type="source"
                    position="top"
                    id="a"
                    style={{  borderRadius: 100, backgroundColor:'red' }}
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
                    style={{ backgroundColor: 'blue' }}
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
