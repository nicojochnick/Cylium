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
import Button from "@material-ui/core/Button";


function AutomationRecurrenceHeaderEditor(props) {


    const classes = useStyles();



    const [cycle, setCycle] = React.useState('week');
    const [monthlyDay, setMonthlyDay] = React.useState('Monday');
    const [monthlyWeek, setMonthlyWeek] = React.useState('1st');
    const [weeklyDays, setWeeklyDays] = React.useState(['Monday', 'Tuesday']);
    const [repeatNumber, setRepeatNumber] = React.useState(1);


    const handleChangeCycle  = (cycle) => {
        setCycle(cycle)
    };

    const handleChangeMonthlyDay = (day) => {
        setMonthlyDay(day);
    };

    const handleChangeMonthlyWeek = (week) => {
        setMonthlyWeek(week);
    };




    const handleChangeWeeklyDay  = (order, day) => {

        let days = weeklyDays;
        days[order] = day;
        setWeeklyDays(days)


    };

    return (
        <div className={classes.root}>

            <form noValidate autoComplete="off">

            <Grid direction='row' justify = 'flex-start' alignItems='center' container xs = {12} md ={12} lg={12}>
                <p style ={{fontSize: 15, color: 'white'}}> Repeats every </p>
                <div style = {{maxWidth:35, marginLeft: 15, marginRight: 0, color:'white'}}>
                    <TextField
                        id="standard-number"
                        type="number"
                        value = {repeatNumber}
                        InputProps={{  disableUnderline: true, className: classes.input}}


                    />
                </div>
                <FormControl className={classes.formControl}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disableUnderline={true}
                        style = {{color:'white',}}
                        value={cycle}
                        InputProps={{  disableUnderline: true, className: classes.input}}
                        placeholder = 'cycle'
                        onChange={e => handleChangeCycle(e.target.value)}
                    >
                        <MenuItem value={'day'}>Day</MenuItem>
                        <MenuItem value={'week'}>Week</MenuItem>
                        <MenuItem value={'month'}>Month</MenuItem>
                    </Select>
                </FormControl>

                <p style ={{fontSize: 15, color: 'white'}}> on </p>


                <FormControl className={classes.formControl}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style ={{color:'white', marginLeft: 10}}
                        value={weeklyDays[0]}
                        disableUnderline={true}
                        placeholder = 'cycle'
                        onChange={e => handleChangeWeeklyDay(0, e.target.value)}
                    >
                        <MenuItem value={'Sunday'}>Sunday</MenuItem>
                        <MenuItem value={'Monday'}>Monday</MenuItem>
                        <MenuItem value={'Tuesday'}>Tuesday</MenuItem>
                        <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
                        <MenuItem value={'Thursday'}>Thursday</MenuItem>
                        <MenuItem value={'Friday'}>Friday</MenuItem>
                        <MenuItem value={'Saturday'}>Saturday</MenuItem>


                    </Select>
                </FormControl>

            </Grid>

            </form>



        </div>
    );
}


const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            padding: 0,
            margin: 0,
            // backgroundColor: 'white',
        },

        stickybutton: {

            top: "0rem",
            position: "sticky",
            display: 'flex',
            // overflow: 'auto',
            flexDirection: 'column',
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
        },


        input: {
            color: "white",
            fontWeight: 500,
            // backgroundColor:'white',
            underline: {
                border:'2px solid white',
                color: 'white'
            }
        },

        textroot: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },

        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 150,
        },

        checkBox: {
            height: 25,
            fontSize: 16,
            width: 25,
        },


    }

));

export default AutomationRecurrenceHeaderEditor;
