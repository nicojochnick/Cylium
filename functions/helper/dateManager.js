const moment = require('moment');
require('moment-recur');

//Get the next date in .getTime() format
export async function generateNextTime(recurrenceObject, numberOfDates) {
    let generatedDate = null;
    let cycle = recurrenceObject.cycle;
    let cycleNumber = recurrenceObject.cycleNumber;
    let monthlyDay = recurrenceObject.monthlyDay;
    let monthlyWeek = recurrenceObject.monthlyWeek;
    let weeklyDays = recurrenceObject.weeklyDays;
    let time = recurrenceObject.time;
    let myDate = moment();

    if (cycle === 'day'){
        let days = [];
        let match =  { 'Sunday': 1, 'Monday': 2, 'Tuesday': 3, 'Wednesday': 4, 'Thursday': 5, 'Friday': 6, 'Saturday': 0,};
        let i = 0;
        for (i of weeklyDays){
            days.push(match[i])
        }
        let nonCycleRecurrence = await myDate.recur().every(days).daysOfWeek();
        generatedDate = await generateDates(nonCycleRecurrence, cycleNumber, numberOfDates);
    } else if (cycle === 'week') {

    } else if (cycle === 'month') {


    } else {
        console.log('error: no cycle present')
    }
    return generatedDate;
}


//Take in a recurring object rule, and a cycle, and return the next 10 dates
function generateDates(recurrentObjectRule, cycleNumber, numberOfDates){
    // console.log('generating Dates:', recurrentObjectRule, cycleNumber)
    let numberOfIterations = cycleNumber * numberOfDates;
    let alldates = recurrentObjectRule.next(numberOfIterations);
    let dates = [];
    let j = 0;
    let i = 0;
    while (numberOfIterations > j) {
        if (dates.length > 10) {
            break;
        } else if (i === cycleNumber-1) {
            let d = new Date(alldates[j]);
            let  t = time.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
            d.setHours( parseInt( t[1]) + (t[3] ? 12 : 0) );
            d.setMinutes( parseInt( t[2]) || 0 );
            dates.push(d);
            i = 0;
        } else {
            i++;
        }
        j++;
    }
    return dates
}
