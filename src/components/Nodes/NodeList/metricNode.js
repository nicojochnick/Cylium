import React, {memo} from 'react';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import TitleAndOptions from "../NodeUtils/NodeHeaders/titleAndOptions";

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
            borderRadius = {10}
            style = {{zIndex: 20,
                boxShadow: '0px 3px 8px #D3D3DA',
                backgroundColor:'white',
                color: 'white',
                overflow:'hidden',
                height: 90,
                margin: 10,
                flexGrow: 1,
            }}
        >
            <TitleAndOptions noOption = {true} title = {title} changeTitle = {changeTitle} />
            <Box style = {{padding: 0, width: 100, overflow:'hidden'}}>
            <TextField
                defaultValue={data.value}
                placeholder={'0'}
                onChange={e=> changeValue(e.target.value)}
                type="number"
                fullWidth={true}
                InputProps={{style: {fontSize: 35,fontWeight: 600, marginLeft: 20},width: 100, disableUnderline: true,}}

            />
            </Box>


        </Box>
    );
}
)

