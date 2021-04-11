import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import { FiMoreVertical } from "react-icons/fi";


function TitleAndOptions(props) {
    return (
        <Box display="flex" justifyContent = 'space-between' flexDirection = 'row' style = {{height: 30, backgroundColor:'grey', color: 'black'}}>

            <TextField
                defaultValue={'title'}
            />
            <IconButton style ={{margin: 0, padding:0, zIndex:20}} onClick={props.handleOpenOptions}>
                <FiMoreVertical  size = {18} style = {{color:'white', margin: 8,}}/>
            </IconButton>
        </Box>
    );
}

export default TitleAndOptions;
