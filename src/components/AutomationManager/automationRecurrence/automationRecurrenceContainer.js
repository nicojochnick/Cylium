import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import AutomationRecurrenceHeaderEditor from "./automationRecurrenceHeaderEditor";
import AutomationRecurrenceEditor from "./automationRecurrenceEditor";
import moment from 'moment'


function AutomationRecurrenceContainer(props) {

    const classes = useStyles();

    const [cycle, setCycle] = React.useState('week');
    const [cycleNumber, setCycleNumber] = React.useState(1);
    const [monthlyDay, setMonthlyDay] = React.useState('Monday');
    const [monthlyWeek, setMonthlyWeek] = React.useState('1st');
    const [weeklyDays, setWeeklyDays] = React.useState(["Monday"]);
    const [time, setTime] = React.useState('12:00');
    const [isEditing, setEditing] = React.useState(false);
    require('moment-recur');


    //TODO: Schematize and send to DB
    const uploadSchedule = () => {
        setEditing(false);

        let dates = createDates()
    };


    const createDates = async() => {
        let myDate = moment();
        console.log(myDate);
        if (cycle == 'week'){
            // console.log(weeklyDays)
            // let cal = moment.recur().every(weeklyDays).daysOfWeek();
            let recurrence = myDate.recur().daysOfWeek(['Saturday']);
            console.log(recurrence)
            let next = recurrence.next(5);
            console.log(next)
        }

    };

    const switchEditing = () => {
        setEditing(!isEditing)
    };

    const handleChangeCycle  = (cycle) => {
        setEditing(true);

        setCycle(cycle)
    };

    const handleChangeMonthlyDay = (day) => {
        setEditing(true);

        setMonthlyDay(day);
    };

    const handleChangeMonthlyWeek = (week) => {
        setEditing(true);

        setMonthlyWeek(week);
    };

    const handleChangeCycleNumber = (number) => {
        setEditing(true);

        setCycleNumber(number);
    };

    const handleChangeWeeklyDay  = (order, day) => {
        setEditing(true);

        console.log(order,day);
        let days = weeklyDays.slice();
        days[order] = day;
        console.log(days)
        setWeeklyDays(days)
    };

    const handleAddWeeklyDay = () =>{
        setEditing(true);

        let days = weeklyDays;
        days.push('Monday');
        setWeeklyDays(days);

    };


    return (
        <div>
            {console.log(weeklyDays)}
            {props.isHeader
                ?
                <AutomationRecurrenceHeaderEditor
                    cycleNumber = {cycleNumber}
                    cycle = {cycle}
                    weeklyDays = {weeklyDays}
                    monthlyWeek = {monthlyWeek}
                    monthlyDay  = {monthlyDay}
                    time = {time}
                    handleChangeWeeklyDay = {handleChangeWeeklyDay}
                    handleAddWeeklyDay = {handleAddWeeklyDay}
                    handleChangeCycleNumber = {handleChangeCycleNumber}
                    handleChangeCycle = {handleChangeCycle}
                    handleChangeMonthlyWeek = {handleChangeMonthlyWeek}
                    handleChangeMonthlyDay = {handleChangeMonthlyDay}
                    isEditing = {isEditing}
                    uploadSchedule = {uploadSchedule}
                />
                :
                <AutomationRecurrenceEditor
                    cycleNumber = {cycleNumber}
                    cycle = {cycle}
                    weeklyDays = {weeklyDays}
                    monthlyWeek = {monthlyWeek}
                    monthlyDay  = {monthlyDay}
                    time = {time}
                    handleChangeWeeklyDay = {handleChangeWeeklyDay}
                    handleAddWeeklyDay = {handleAddWeeklyDay}
                    handleChangeCycleNumber = {handleChangeCycleNumber}
                    handleChangeCycle = {handleChangeCycle}
                    handleChangeMonthlyWeek = {handleChangeMonthlyWeek}
                    handleChangeMonthlyDay = {handleChangeMonthlyDay}
                />
            }

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

    }

));

export default AutomationRecurrenceContainer;
