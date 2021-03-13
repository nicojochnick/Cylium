import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import { Handle } from 'react-flow-renderer';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";




export default memo(({ data }) => {
    console.log('DATANODE', data)

    return (
        <>

        <Box display = 'flex' flexDirection ='column' justifyContent = 'center' alignItems = 'center'>


            <TextField
                id="standard-basic"
                // placeholder="add text"
                multiline
                onChange={data.onChange}
                defaultValue={data.text}
                style={{fontSize: 10}}
                // className={classes.packageInputText}
                fullWidth
                InputProps={{style: {fontSize: 15, margin: 5,}, disableUnderline: true,}}
                rowsMax={5}
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

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

