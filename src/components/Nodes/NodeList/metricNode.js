import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

export default memo(({ data}) => {
    return (
        <Box display = 'flex' flexDirection = 'column' border = {1}  borderRadius = {20} style = {{height: 100, backgroundColor:'white'}}>
            <TextField
                defaultValue={data.name}
                placeholder={'untitled'}
            />

            <TextField
                defaultValue={data.value}
                placeholder={'0'}
                type="number"

            />


        </Box>
    );
}
)

