import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import { FiMoreVertical } from "react-icons/fi";
import Divider from "@material-ui/core/Divider";


function TitleAndOptions(props) {
    return (
        <div>
        <Box borderColor = {props.color} borderBottom = {1}  display="flex" justifyContent = 'space-between' flexDirection = 'row' style = {{height: 37, }}>
            <TextField
                defaultValue={props.title}
                placeholder={'untitled'}
                InputProps={{style: {fontSize: 16,fontWeight: 500, margin: 5,}, disableUnderline: true,}}
                onChange = {(e)=>props.changeTitle(e.target.value)}

            />
            {props.noOption
                ?   null
                :   <IconButton style ={{padding:0, zIndex:20}} onClick={props.handleOpenOptions}>
                        <FiMoreVertical  size = {18} style = {{color:props.color, margin: 8,}}/>
                    </IconButton>
                }
        </Box>
            <Divider/>
        </div>

    );
}

export default TitleAndOptions;
