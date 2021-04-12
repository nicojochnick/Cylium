import React, {memo} from 'react';
import Calendar from "@ericz1803/react-google-calendar";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid"
import {BiPlus,BiRefresh, BiImport} from "react-icons/bi";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import {API_KEY} from "../../../api/googleAPI";


let calendars = [
    {calendarId: ''},

];

let styles = {
    //you can use object styles (no import required)
    calendar: {
        borderRadius: 20, //make outer edge of calendar thicker
        width: 900,
        overflow:'hidden',
        display:'flex',
        flexDirection:'column',
        // height: 800,
        boxShadow: '0px 5px 10px #D3D3DA',
    },
};


export default memo(({ data,}) => {
    const classes = useStyles();

    const [isEditingID, setIsEditingID] = React.useState(false);
    const [calendarID, setCalendarID] = React.useState(data.calendarID);
    const [calendars, setCalendars] = React.useState([{calendarId: data.calendarID}]);
    const [, updateState] = React.useState();


    const handleEditID = () => {
        setIsEditingID(!isEditingID)

    };

    const handleCalendarIDSave = () => {
        data.calendarID = calendarID;
        setCalendarID(calendarID);
        setCalendars([{calendarId: calendarID}]);

        handleEditID()

    };

    const getCalendar = () => {
        let cal = [{calendarId: calendarID}];
        console.log(cal)
        return cal;
    };

    const refresh = React.useCallback(() => updateState({}), [])

    return (
        <Grid direction ='column' container alignItems={'flex-end'} justify = 'flex-end'>

            <Grid direction ='row' container alignItems={'flex-end'} justify = 'flex-end'>

            <Box
                display = 'flex'
                justifyContent = 'center'
                alignItems = 'center'
                borderRadius = {100}
                borderColor = {'black'}
                style = {{zIndex: 20,
                    boxShadow: '0px 3px 8px #D3D3DA',
                    backgroundColor:'white',
                    color: 'white',
                    height: 50,
                    minWidth: 50,
                    marginRight: 20,
                    marginBottom: -25,
                    overflow:'hidden'}
                }
            >
                <IconButton onClick = {refresh} variant="contained" color="primary" style={{margin: 0, padding: 0}}>
                    <BiRefresh style={{color: 'grey'}} size={25}/>
                </IconButton>
            </Box>

                <Box
                    display = 'flex'
                    justifyContent = 'center'
                    alignItems = 'center'
                    borderRadius = {100}
                    borderColor = {'black'}
                    style = {{zIndex: 20,
                        boxShadow: '0px 3px 8px #D3D3DA',
                        backgroundColor:'white',
                        color: 'white',
                        height: 50,
                        minWidth: 50,
                        marginRight: 20,
                        marginBottom: -25,
                        overflow:'hidden'}
                    }
                >

                    {isEditingID
                        ?
                        <Box display = 'flex' flexDirection = 'row'>
                            <p style = {{color:'black', marginLeft: 15, fontSize: 15}}> Google Calendar ID: </p>
                        <TextField
                            size={'small'}
                            onChange={(e)=>setCalendarID(e.target.value)}
                            className={classes.button}
                            value={calendarID}
                            InputProps={{min: 0, style: {  marginLeft: 15, color:'black', width: 400, marginRight: 10 }, input: {fontSize: 13, backgroundColor: 'black',},}}
                        />

                            <Button container onClick = {()=>setIsEditingID(false)}>
                                cancel
                            </Button>

                        <Button color = 'primary' container onClick = {handleCalendarIDSave}>
                           save
                        </Button>
                        </Box>

                        : <IconButton onClick = {handleEditID} variant="contained" color="primary" style={{margin: 0, padding: 0}}>
                            <BiPlus style={{color: 'grey'}} size={25}/>
                        </IconButton>
                    }
                </Box>
            </Grid>
            <div style = {{backgroundColor:'white'}}>

            <Calendar styles = {styles} apiKey={API_KEY} calendars={calendars}/>
            </div>


        </Grid>
    );
}
)


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    a: {
        textDecoration:'none'

    },
    button: {
        textTransform: 'none',
        borderRadius: 6,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    margin: {
        margin: theme.spacing(1),
        color: "white"
    },
    input: {
        color: "white"
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));

