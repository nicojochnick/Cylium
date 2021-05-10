import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid";
import {BiCubeAlt, BiDetail} from "react-icons/bi";
import {makeStyles} from "@material-ui/core";

function NodeProfile(props) {
    const [title,setTitle] = React.useState(props.title);
    const [avatarClass, setAvatarClass] = React.useState('large');
    const [textStyle, setTextStyle] = React.useState({fontSize: 28, margin: 10});


    const classes = useStyles();

    const getIcon = (type) => {

        switch (type) {
            case  'box':
                return <BiCubeAlt size={25} style={{color: '#4B494D'}}/>
            case  'document':
                return <BiDetail size={15} style={{color: '#4B494D'}}/>
        }

    };
    const changeTitle = (text) => {
        setTitle(text)
      props.changeTitle(text)

    };
    useEffect(() => {
        if (props.size === 'small'){
            setAvatarClass('small');
            setTextStyle({fontSize: 18,margin: 5})
        }

    }, []);

    return (
        <Box style = {{height: 100}} display = 'flex' flexDirection = 'row' alignItems = 'center' justifyContent = 'center' >
            <Avatar className = {avatarClass === 'small' ? classes.small : classes.large}>
                { getIcon(props.type)
                }

            </Avatar>

                <TextField
                    onChange={(e)=> changeTitle(e.target.value)}
                    id="standard-basic"
                    placeholder="Untitled"
                    value={title}
                    InputProps={{style: {fontSize: textStyle.fontSize, margin: textStyle.margin, fontWeight: 600, color:props.user.theme === 'dark' ? 'white' : '#363638'}, disableUnderline: true,}}
                />


        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    small :{

        width: theme.spacing(4),
        height: theme.spacing(4),
        margin: 5,
        border: 1,
        backgroundColor: '#EEEEEE'


    },

    large :{

        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: 10,
        border: 1,
        backgroundColor: '#EEEEEE'


    }
}));

export default NodeProfile;
