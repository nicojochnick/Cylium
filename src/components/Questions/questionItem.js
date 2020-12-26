import React from 'react';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField/TextField";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";


function QuestionItem(props) {
    const classes = useStyles();

    console.log(props.question);
    return (
        <div>
            <Grid item>
                <Box className={classes.box} boxShadow = {0} style = {{padding: 20, boxShadow: "0px 5px 10px #D7D7DA"}} borderRadius={10}>
                <p> {props.question.label} </p>
                { (props.question.type === 'text')
                    ? <TextField
                        variant="outlined"
                        fullWidth
                        rows={10}
                        multiline
                        required
                        label= 'start typing....'
                        placeholder=""
                        onChange={()=>console.log('submit')}
                        rowsMax={5}
                        value={''}
                    />
                    :
                    <div style = {{marginTop: 35}}>
                    <Slider
                        defaultValue={5}
                        getAriaValueText={''}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        valueLabelDisplay="on"
                        step={0.5}
                        marks
                        min={1}
                        max={10}
                    />
                    </div>
                }
                </Box>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box:{
        flexGrow: 1,
        padding: 0,
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
    },

    boxSticky:{
        padding: 0,
        top: "5rem",
        position: "sticky",
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        minHeight: 300,
    },

    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    paper: {
        justify: 'center',
        padding: theme.spacing(2),
        display: 'start',
        overflow: 'auto',
        flexDirection: 'column',
        margin: 0,
    },

    fixedHeight: {
        height: 350,
    },
}));


export default QuestionItem;
