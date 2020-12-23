import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField/TextField";
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import {makeStyles} from "@material-ui/core/styles";
import {db} from "../../api/firebase";


function UserId(props) {
    const classes = useStyles();
    const [user, setUser] = React.useState(null);


    const [checked, setChecked] = React.useState([1]);

    const getUser = async () => {
        let userRef = db.collection("users").doc(props.email)
        const user = await userRef.get();
        const userData = user.data();
        console.log(userData)
        setUser(userData);
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    useEffect(() => {
        getUser()

    }, []);


    return (
        <div>
            {/*<Box component="span" style = {{margin: 10}} border = {2} borderColor = {'#4D6DF1'} borderRadius = {50}>*/}
            {/*    <Avatar src={props.user.imageAsUrl.imgUrl} className = {classes.large}></Avatar>*/}
            {/*</Box>*/}
            {/*<p> {props.user.name} </p>*/}

            {(user)
                ?
                <Grid container justify = 'flex-start'>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Grid container>
                        <Box component="span" style = {{margin: 0}} border = {2} borderColor = {'#4D6DF1'} borderRadius = {50}>
                            <Avatar src={user.img_url_Profile.imgUrl} className = {classes.large}></Avatar>
                        </Box>
                        </Grid>
                    </ListItemAvatar>
                    <Grid item>
                    <ListItemText
                        style = {{margin: 15, marginLeft: 5}}
                        aria-setsize={20}
                        primary={user.name}
                    />
                    </Grid>
                    <ListItemSecondaryAction>
                        <Checkbox
                            edge="end"
                            onChange={handleToggle(false)}
                            checked={false}
                            inputProps={{ 'aria-labelledby': 1 }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                </Grid>
                :null
            }
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    box: {
        padding: 0,
        margin: 0,
        marginBottom: 20,
        borderRadius: 5,
    },
    container:{
        margin: 20

    },
    formGroup: {
        alignItems: 'center'
    },

    submitButton: {
        margin: 10,
    },

    root: {
        height: '100vh',
        flexGrow:1
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        backgroundColor: "#10102F"

    },
    input: {
        display: 'none',
    },

}));
export default UserId;
