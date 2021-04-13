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
            borderRadius = {8}
            style = {{zIndex: 20,
                boxShadow: '0px 3px 8px #D3D3DA',
                backgroundColor:'white',
                color: 'white',
                overflow:'hidden',
                height: 80,
                margin: 10,
                flexGrow: 1,
            }}
        >
            <TitleAndOptions color = {data.color} noOption = {true} title = {title} changeTitle = {changeTitle} />
            <Box style = {{padding: 0, width: 80, overflow:'hidden'}}>
            <TextField
                defaultValue={data.value}
                placeholder={'0'}
                onChange={e=> changeValue(e.target.value)}
                type="number"
                fullWidth={true}
                InputProps={{style: {color: '#3C3F43', fontSize: 28,fontWeight: 600, marginLeft: 15},width: 80, disableUnderline: true,}}

            />
            </Box>


        </Box>
    );
}
)

