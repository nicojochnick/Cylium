import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import AutomationRecurrenceHeaderEditor from "./automationRecurrenceHeaderEditor";
import AutomationRecurrenceEditor from "./automationRecurrenceEditor";


function AutomationRecurrenceContainer(props) {

    const classes = useStyles();

    const [cycle, setCycle] = React.useState('week');
    const [cycleNumber, setCycleNumber] = React.useState(1);
    const [monthlyDay, setMonthlyDay] = React.useState('Monday');
    const [monthlyWeek, setMonthlyWeek] = React.useState('1st');
    const [weeklyDays, setWeeklyDays] = React.useState(["Monday"]);
    const [time, setTime] = React.useState('12:00');

    const handleChangeCycle  = (cycle) => {
        setCycle(cycle)
    };

    const handleChangeMonthlyDay = (day) => {
        setMonthlyDay(day);
    };

    const handleChangeMonthlyWeek = (week) => {
        setMonthlyWeek(week);
    };

    const handleChangeCycleNumber = (number) => {
        setCycleNumber(number);
    };

    const handleChangeWeeklyDay  = (order, day) => {
        console.log(order,day);
        let days = weeklyDays.slice()
        days[order] = day;
        console.log(days)
        setWeeklyDays(days)
    };

    const handleAddWeeklyDay = () =>{
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
