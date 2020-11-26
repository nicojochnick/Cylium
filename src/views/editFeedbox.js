import React from 'react';
import Url from "../components/URL";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch/Switch";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';


import Feedbox from "../views/feedbox"

function EditFeedbox(props) {
    const classes = useStyles();
    const [switchState, setSwitch] = React.useState( false);
    const [successSubmit, setSuccess] = React.useState( false);
    const handleSwitch = (event) => {
        setSwitch(!switchState);
    };

    const handleSave = () => {

        //TODO: send data to firestore

    };

    return (
        <Grid container component = "main" className = {classes.root}>
            <Grid item xs={4} sm={4}  style={{backgroundColor: "white"}} >
                <form onSubmit = {handleSave}>
                <Box className={classes.box}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar>W</Avatar>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <InputLabel htmlFor="standard-adornment-amount">Name</InputLabel>
                            <Input
                                fullWidth
                                label = "Name"
                                id="standard-adornment-amount"
                            />
                        </Grid>
                    </Grid>
                    <Grid style = {{marginTop: 20}} item>

                        <TextField
                            placeholder="start typing..."
                            multiline
                            rows={10}
                            fullWidth={true}
                            label="Welcome message"
                            variant="outlined"
                            rowsMax={8}
                        />
                    </Grid>

                    <Button
                        className={classes.submitButton}
                        variant="contained"
                        type='submit'
                        style={{
                            marginRight: 45,
                            marginLeft: 0,
                            paddingRight: 60,
                            paddingLeft: 60,
                            borderRadius: 5,
                            backgroundColor: "#3574EE",
                        }}
                    >
                        <p style = {{color: 'white', fontWeight: '600', margin: 5}}>
                            Save Changes
                        </p>

                    </Button>
                </Box>
                </form>
            </Grid>

            <Grid item xs={6} sm={8} >
            <Feedbox/>
            </Grid>
        </Grid>
    );
}


const useStyles = makeStyles((theme) => ({

    box: {
        padding: 15,
        margin: 10,
        marginBottom: 20,
        borderRadius: 5,
        // backgroundColor: '#EFF2F9'

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

}));

export default EditFeedbox;
