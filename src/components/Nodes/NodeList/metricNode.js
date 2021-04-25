import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import TitleAndOptions from "../NodeUtils/NodeHeaders/titleAndOptions";
import {Handle} from "react-flow-renderer";
import Grid from "@material-ui/core/Grid";

export default memo(({ data}) => {
        const [title, setTitle] = React.useState(data.title);
        const [value, setValue] = React.useState(data.value);


        const changeTitle = (title) => {
            data.title = title;
            setTitle(title)
        };

        const changeValue = (val) => {
            data.value = val;
            setValue(val)
        };

        return (
        <Box
            display = 'flex'
            flexDirection = 'column'
            borderRadius = {8}
            style = {{zIndex: 20,
                boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)`,
                backgroundColor:'white',
                color: 'white',
                overflow:'hidden',
                height: 80,
                flexGrow: 1,

            }}
        >
            <TitleAndOptions  noOption = {true} title = {title} changeTitle = {changeTitle} />
            <Box style = {{padding: 0, width: 80, overflow:'hidden'}}>
            <TextField
                defaultValue={data.value}
                placeholder={'0'}
                onChange={e=> changeValue(e.target.value)}
                type="number"
                fullWidth={true}
                InputProps={{style: {fontSize: 28,fontWeight: 600, marginLeft: 15},width: 80, disableUnderline: true,}}

            />
                <Handle
                    type="source"
                    id = 'k'
                    position="bottom"
                    style={{ zIndex: 12, backgroundColor: data.color,boxShadow: `0px 3px 10px rgba(0, 0, 0, 0.15)` }}
                    // onConnect={(params) => console.log('handle onConnect', params)}
                />
            </Box>



        </Box>
    );
}
)

