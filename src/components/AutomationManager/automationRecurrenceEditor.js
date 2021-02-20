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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

function AutomationRecurrenceEditor(props) {

    const classes = useStyles();

    const [cycle, setCycle] = React.useState('week');
    const [repeatNumber, setRepeatNumber] = React.useState(1);
    const [end, setEnd] = React.useState('Never');


    const handleChangeCycle  = (cycle) => {
        setCycle(cycle)
    };

    const handleChangeEnd = (end) => {

        setEnd(end)
    };

    return (
        <Box style = {{padding: 20, marginTop: -10, minWidth: 200}}>

            <form noValidate autoComplete="off">

                <Grid xs = {12} md ={12} lg={12} direction = 'column' container>



                    <Grid direction='row' justify = 'flex-start' alignItems='center' container xs = {12} md ={12} lg={12}>


                        <p style ={{fontSize: 15}}> Repeat every </p>

                        <div style = {{maxWidth: 50, marginLeft: 15, marginRight: 15}}>

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
git

                    <Grid direction='row' justify = 'flex-start' alignItems='center' container xs = {12} md ={12} lg={12}>

                        {(cycle == 'week')

                            ? <Box style={{marginTop: 10}}>

                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="Sunday"
                                        control={<Checkbox icon={<RadioButtonUncheckedOutlinedIcon/>}
                                                           checkedIcon={<RadioButtonCheckedIcon/>} color="primary"/>}
                                        label="S"
                                        labelPlacement="bottom"
                                        className={classes.checkBox}
                                    />
                                    <FormControlLabel
                                        value="Monday"
                                        control={<Checkbox icon={<RadioButtonUncheckedOutlinedIcon/>}
                                                           checkedIcon={<RadioButtonCheckedIcon/>} color="primary"/>}
                                        label="M"
                                        labelPlacement="bottom"
                                        className={classes.checkBox}
                                    />
                                    <FormControlLabel
                                        value="Tuesday"
                                        control={<Checkbox icon={<RadioButtonUncheckedOutlinedIcon/>}
                                                           checkedIcon={<RadioButtonCheckedIcon/>} color="primary"/>}
                                        label="T"
                                        labelPlacement="bottom"
                                        className={classes.checkBox}
                                    />
                                    <FormControlLabel
                                        value="Wednesday"
                                        control={<Checkbox icon={<RadioButtonUncheckedOutlinedIcon/>}
                                                           checkedIcon={<RadioButtonCheckedIcon/>} color="primary"/>}
                                        label="W"
                                        labelPlacement="bottom"
                                        className={classes.checkBox}
                                    />
                                    <FormControlLabel
                                        value="Thursday"
                                        control={<Checkbox icon={<RadioButtonUncheckedOutlinedIcon/>}
                                                           checkedIcon={<RadioButtonCheckedIcon/>} color="primary"/>}
                                        label="T"
                                        labelPlacement="bottom"
                                        className={classes.checkBox}
                                    />
                                    <FormControlLabel
                                        value="Friday"
                                        control={<Checkbox icon={<RadioButtonUncheckedOutlinedIcon/>}
                                                           checkedIcon={<RadioButtonCheckedIcon/>} color="primary"/>}
                                        label="F"
                                        labelPlacement="bottom"
                                        className={classes.checkBox}
                                    />
                                    <FormControlLabel
                                        value="Saturday"
                                        control={<Checkbox icon={<RadioButtonUncheckedOutlinedIcon/>}
                                                           checkedIcon={<RadioButtonCheckedIcon/>} color="primary"/>}
                                        label="S"
                                        labelPlacement="bottom"
                                        className={classes.checkBox}
                                    />
                                </FormGroup>

                            </Box>

                            :null

                        }

                    </Grid>

                </Grid>


                <Grid xs = {12} md ={12} lg={12} direction = 'column' container>



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

        checkBox: {

            height: 25,
            width: 25,


        },

    }

));

export default AutomationRecurrenceEditor;


{/*<Grid item xs = {12} md ={12} lg={12}>*/}
{/*    <p> Ends </p>*/}

{/*</Grid>*/}

{/*<Grid direction='row' container xs = {12} md ={12} lg={12}>*/}


{/*    <FormControl component="fieldset">*/}
{/*    <RadioGroup aria-label="Ends" name="Ends" value={end} onChange={handleChangeEnd}>*/}
{/*    <FormControlLabel value="Never" control={<Radio />} label="Never" />*/}
{/*    <FormControlLabel value="On" control={<Radio />} label="On" />*/}
{/*    <FormControlLabel value="After" control={<Radio />} label="After" />*/}
{/*    </RadioGroup>*/}
{/*</FormControl>*/}


{/*</Grid>*/}
