import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Box from "@material-ui/core/Box";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function TrackerEdit(props) {
    const classes = useStyles();
    console.log(props.id);
    const [on, setOn] = React.useState(props.item.on);

    const handleSwitchQuestion = (on) => {
        props.handleSwitchQuestion(props.id, !on);
        setOn(!on)
    };
    return (
        <div>
            <Box className={classes.box} boxShadow = {0} style = {{padding: 20, boxShadow: "0px 5px 10px #D7D7DA"}} borderRadius={10}>

            {(props.item)
                ?
                    <Grid style = {{margin: 4}} container>
                        <Grid container direction = 'row' alignItems = 'center' justify='space-between'>
                            <p style = {{fontSize: 16, color:"#9FA5B1", fontWeight: 500, margin: 3}}>
                                QUESTION: {props.id}
                            </p>
                            <Grid item>

                            </Grid>
                        </Grid>
                        <Divider/>
                        <p> {props.item.label} </p>
                        <Checkbox checked={on} onChange={() => handleSwitchQuestion(on)} color="primary"/>
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox checked={on} onChange={() => handleSwitchQuestion(on)} color="primary"/>}*/}
                        {/*    label={props.item.label}*/}
                        {/*/>*/}
                    </Grid>
                : null
            }
            </Box>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    box: {
        flexGrow: 1,
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
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
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: "#10102F"

    },
    input: {
        display: 'none',
    },

}));

export default TrackerEdit;

{/*<Box style = {{margin: 0, padding: 4}} borderRadius = {20} border = {1} >*/}
{/*<p style = {{margin:5, fontSize: 10}}>*/}
{/*    Category: Team Strength*/}
{/*</p>*/}
{/*</Box>*/}
