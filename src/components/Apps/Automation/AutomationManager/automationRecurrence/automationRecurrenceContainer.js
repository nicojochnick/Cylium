import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import AutomationRecurrenceHeaderEditor from "./automationRecurrenceHeaderEditor";
import AutomationRecurrenceEditor from "./automationRecurrenceEditor";
import {generateDates} from "../../../../../helpers/dateManagement";
import moment from 'moment'
import {sendMessageFS} from "../../../../../api/firestore";

import {db} from "../../../../../api/firebase";


function AutomationRecurrenceContainer(props) {

    require('moment-recur');
    const classes = useStyles();

    const [cycle, setCycle] = React.useState('week');
    const [cycleNumber, setCycleNumber] = React.useState(1);
    const [weeklyDays, setWeeklyDays] = React.useState(['Monday']);
    const [monthlyDay, setMonthlyDay] = React.useState('Monday');
    const [monthlyWeek, setMonthlyWeek] = React.useState([1]);
    const [time, setTime] = React.useState('12:00');
    const [isEditing, setEditing] = React.useState(false);
    const [sendOption, setSendOption] = React.useState('onClick');
    const [next10, setNext10] = React.useState([]);


    /*
    TODO: consider changing scope and/or reduce the number of writes to one by creating a custom ID
    Send Automation could be outside of the automation Recurrence scope, consider a larger refactor
     */
    const sendAutomationMessage = async () => {
        try {
            await sendMessageFS(props.id, props.tracker.adminID, props.tracker.call, props.tracker.recipientIDs);
        } catch (error) {
            console.log('sending message failed ', error)
        }

    };

    const uploadRecurrenceToDB = async (rec, dates,) => {
        console.log('Uploading Recurrence to DB:', rec, time, dates);
        let timeCopy = time;
        let dbdates= dates.slice();
        let recObj = {
            start: Date(),
            cycle: cycle,
            cycleNumber: cycleNumber,
            weeklyDays: weeklyDays,
            monthlyDay: monthlyDay,
            monthlyWeek: monthlyWeek,
            time: time
        };
        if (dates.length > 0) {
            let ref = db.collection('trackers').doc(props.id);
            const res = await ref.update({
                recurrence: recObj,
                dates: dbdates,
                time: timeCopy,
                nextDateTime: dbdates[0]
            })
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch(e => {
                    console.log('error' + e)
                })
        }
    };


/* TODO: Tester Function should be added to unit tests */
    const parseRecurrenceFromDB = () => {
        let ref = db.collection('trackers').doc(props.id).get()
            .then((doc => {
                let track = doc.data();
                console.log(track)
            })
            )
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    };

    const uploadSchedule =async() => {
        setEditing(false);
        return createDates()
    };

    const createDates = async () => {
        let myDate = moment();
        if (cycle === 'week'){
            let days = [];
            let match =  { 'Sunday': 1, 'Monday': 2, 'Tuesday': 3, 'Wednesday': 4, 'Thursday': 5, 'Friday': 6, 'Saturday': 0,};
            let i = 0;
            for (i of weeklyDays){
                days.push(match[i])
            }
            // let recurrence = myDate.recur().every(cycleNumber).weeks()
            // setRecurrence(nonCycleRecurrence);
            let t = time.slice();
            let nonCycleRecurrence = await myDate.recur().every(days).daysOfWeek();
            console.log('inputs:  ',nonCycleRecurrence, cycleNumber);
            let next_10 = await generateDates(nonCycleRecurrence, cycleNumber,t,10);
            console.log('next ten' + next_10);
            setNext10(next_10);
            if (next_10.length === 10) {
                await uploadRecurrenceToDB(nonCycleRecurrence, next_10, );
            } else {
                console.log('error: dates not generated')
            }
        } else if (cycle === 'day'){
            let recurrence = myDate.recur().every(cycleNumber).day()

        } else {
            let days = [];
            let match =  { 'Sunday': 1, 'Monday': 2, 'Tuesday': 3, 'Wednesday': 4, 'Thursday': 5, 'Friday': 6, 'Saturday': 0,};
            let i = 0;
            for (i of monthlyDay){
                days.push(match[i])
            }
           // let recurrence = myDate.recur().every(days).day().every().weeksOfMonth(monthlyWeek)
        }
    };
    const switchEditing = () => {
        setEditing(!isEditing)
    };

    const handleChangeSendOption = (option) => {
        setSendOption(option)
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
        console.log(days);
        setWeeklyDays(days)
    };
    const handleAddWeeklyDay = () =>{
        setEditing(true);
        let days = weeklyDays;
        days.push('Monday');
        setWeeklyDays(days);
    };
    const handleChangeTime = (time) => {
        setEditing(true);
        console.log(time);
        setTime(time)
    };

    useEffect(() => {
        // parseRecurrenceFromDB()

    }, []);

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
                    handleChangeTime = {handleChangeTime}
                    handleChangeSendOption = {handleChangeSendOption}
                    sendOption = {sendOption}
                    sendAutomationMessage = {sendAutomationMessage}
                />
                :
                <AutomationRecurrenceEditor
                    cycleNumber = {cycleNumber}
                    cycle = {cycle}
                    weeklyDays = {weeklyDays}
                    monthlyWeek = {monthlyWeek}
                    monthlyDay  = {monthlyDay}
                    time = {time}
                    handleChangeTime = {handleChangeTime}
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
