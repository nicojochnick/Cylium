import Box from "@material-ui/core/Box";
import React, { memo } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Handle } from 'react-flow-renderer';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import {BiEdit} from "react-icons/bi"

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

    const LightTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: theme.palette.common.white,
            color: '#565559',
            boxShadow: "0px 0px 4px #C5C5C5",
            fontSize: 14,
            borderRadius: 3,
        },
    }))(Tooltip);



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

                <LightTooltip onClick = {()=>console.log('clicked')}  interactive title = {<IconButton style = {{margin: 0, padding: 0}} onClick = {()=> console.log('click')}> <BiEdit style ={{margin:2}} size = {19} /> </IconButton>} placement={'right'} >
                    <div style = {{height: 6, width: 6, margin: 2, backgroundColor:'grey', borderRadius: 100}} />
                </LightTooltip>

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
