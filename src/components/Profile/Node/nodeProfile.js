import React from 'react';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid";
import {BiCubeAlt} from "react-icons/bi";
import {makeStyles} from "@material-ui/core";

function NodeProfile(props) {
    const [title,setTitle] = React.useState(props.title)

    const classes = useStyles();

    const getIcon = () => {
        console.log('get')

        return <BiCubeAlt size = {25} style = {{color:'#4B494D'}} />

    };

    const changeTitle = (text) => {
        setTitle(text)
      props.changeTitle(text)

    };

    return (
        <Box style = {{height: 100}} display = 'flex' flexDirection = 'row' alignItems = 'center' justifyContent = 'center' >
            <Avatar className = {classes.small}>
                { getIcon()
                }

            </Avatar>

                <TextField
                    onChange={(e)=> changeTitle(e.target.value)}
                    id="standard-basic"
                    placeholder="Untitled"
                    value={title}
                    InputProps={{style: {fontSize: 28, margin: 10, fontWeight: 600, color:'#4B494D'}, disableUnderline: true,}}
                />


        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    small :{

        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: 10,
        border: 1,
        backgroundColor: '#EEEEEE'


    }
}));

export default NodeProfile;
