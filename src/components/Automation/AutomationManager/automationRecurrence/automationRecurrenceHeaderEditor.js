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
    return (
        <div className={classes.root}>
            <form noValidate autoComplete="off">
            <Grid direction='row' justify = 'flex-start' alignItems='center' container>
                <p style ={{fontSize: 15, color: 'white'}}> Send </p>
                <FormControl className={classes.formControl}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{color: 'white', marginLeft: 10}}
                        value = {props.sendOption}
                        defaultValue={props.sendOption}
                        disableUnderline={true}
                        onChange={(e) => props.handleChangeSendOption(e.target.value)}
                    >
                        <MenuItem value={'onSchedule'}>every </MenuItem>
                        <MenuItem value={'onClick'}>on click </MenuItem>

                    </Select>
                </FormControl>

                {(props.sendOption === 'onSchedule')

                   ? <div className={classes.root}>
                        <Grid direction='row' justify='flex-start' alignItems='center' container>

                            <div style={{maxWidth: 35, marginLeft: 15, marginRight: 0, color: 'white'}}>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        disableUnderline={true}
                                        style={{color: 'white', marginRight: 5}}
                                        value={props.cycleNumber}
                                        InputProps={{disableUnderline: true, className: classes.input}}
                                        placeholder='cycle'
                                        onChange={e => props.handleChangeCycleNumber(e.target.value)}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    disableUnderline={true}
                                    style={{color: 'white', marginLeft: 10}}
                                    value={props.cycle}
                                    InputProps={{disableUnderline: true, className: classes.input}}
                                    placeholder='cycle'
                                    onChange={e => props.handleChangeCycle(e.target.value)}
                                >
                                    <MenuItem value={'day'}>Day(s)</MenuItem>
                                    <MenuItem value={'week'}>Week(s)</MenuItem>
                                    <MenuItem value={'month'}>Month(s)</MenuItem>
                                </Select>
                            </FormControl>
                            {(props.cycle == 'day')
                                ? null
                                :
                                <div className={classes.root}>
                                    <Grid direction='row' justify='flex-start' alignItems='center' container>

                                        <p style={{
                                            fontSize: 15,
                                            color: 'white',
                                            marginLeft: 5,
                                            marginRight: 5
                                        }}> on </p>

                                        {(props.cycle == 'week')
                                            ?
                                            <FormControl className={classes.formControl}>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    style={{color: 'white', marginLeft: 10}}
                                                    value={props.weeklyDays[0]}
                                                    disableUnderline={true}
                                                    onChange={(e) => props.handleChangeWeeklyDay(0, e.target.value)}
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
                                            :
                                            <Box display='flex'
                                                 flexDirection='row'
                                                 justify='center'
                                                 alignItems='flex-start '
                                                 style={{marginLeft: 15, marginRight: 15}}
                                            >
                                                <FormControl className={classes.formControl}>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        style={{color: 'white', marginLeft: 10}}
                                                        value={props.monthlyWeek}
                                                        placeholder='day of the week'
                                                        disableUnderline={true}
                                                        onChange={e => props.handleChangeMonthlyWeek(e.target.value, 0)}
                                                    >
                                                        <MenuItem value={1}>1st</MenuItem>
                                                        <MenuItem value={2}>2nd</MenuItem>
                                                        <MenuItem value={3}>3rd</MenuItem>
                                                        <MenuItem value={4}>4th</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={props.monthlyDay}
                                                        style={{color: 'white', marginLeft: 10}}
                                                        placeholder='day of the week'
                                                        disableUnderline={true}
                                                        onChange={e => props.handleChangeMonthlyDay(e.target.value)}
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
                                            </Box>
                                        }
                                    </Grid>
                                </div>
                            }
                            <p style={{fontSize: 15, marginLeft: 5, marginRight: 20, color: 'white'}}> at </p>
                            <div style={{color: 'white', marginRight: 10}}>
                                <TextField
                                    id="time"
                                    type="time"
                                    defaultValue="12:00"
                                    className={classes.textField}
                                    onChange={(event) => props.handleChangeTime(event.target.value)}
                                    InputLabelProps={{
                                        color: 'white',
                                        shrink: true,
                                        disableUnderline: true,
                                        className: classes.textFieldWhite

                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                        className: classes.textField,
                                        step: 300, // 5 min
                                    }}
                                />
                            </div>

                            {props.isEditing
                                ?
                                <Button
                                    variant="contained"
                                    color='white'
                                    className={classes.button}
                                    onClick={() => props.uploadSchedule()}
                                >
                                    Save
                                </Button>
                                : null
                            }
                        </Grid>
                    </div>

                    :
                    <Button
                        style = {{marginLeft: 15, marginRight: 15}}
                        variant="contained"
                        color='white'
                        className={classes.button}
                        onClick={() => props.sendAutomationMessage()}
                    >
                        Send
                    </Button>

                }

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
            marginRight: 5,
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
            width: 110,
            color: "white"
        },

        textFieldWhite: {
            color: "white"
        },

        checkBox: {
            height: 25,
            fontSize: 16,
            width: 25,
        },


    }

));

export default AutomationRecurrenceHeaderEditor;
