import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Divider from "@material-ui/core/Divider";

function AutomationRecurrenceEditor(props) {

    const classes = useStyles();

    const [cycle, setCycle] = React.useState('week');
    const [repeatNumber, setRepeatNumber] = React.useState(1);


    const handleChangeCycle  = (cycle) => {
        setCycle(cycle)
    };

    return (
        <Box style = {{margin: 10, minWidth: 200}}>

            <form noValidate autoComplete="off">

                <Grid xs = {12} md ={12} lg={12} direction = 'row' container>

                    <Grid item xs = {5} md ={5} lg={5}>
                        <p> Repeat Every </p>

                    </Grid>

                    <Grid item xs = {7} md ={7} lg={7}>

                        <div style = {{maxWidth: 50, marginBottom: 5}}>

                        <TextField
                            id="standard-number"
                            type="number"
                            value = {repeatNumber}

                        />

                        </div>


                        <FormControl className={classes.formControl}>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cycle}
                                placeholder = 'cycle'
                                onChange={e => handleChangeCycle(e.target.value)}
                            >
                                <MenuItem value={'day'}>Day</MenuItem>
                                <MenuItem value={'week'}>Week</MenuItem>
                                <MenuItem value={'month'}>Month</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>

                </Grid>

            </form>

        </Box>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0,
        margin: 0,
        minHeight: 200,
        // maxWidth: 540,
        // backgroundColor: 'white',
    },
    box: {
        flexGrow: 1,
        padding: 0,
        display: 'start',
        flexDirection: 'column',
        // margin: 10,
        // marginBottom: 20,
    },

    formControl: {
        minWidth: 100,
    },

    textroot: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },

}));

export default AutomationRecurrenceEditor;
