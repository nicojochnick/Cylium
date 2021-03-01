
import moment from 'moment'
require('moment-recur');



//Take in a recurring object rule, and a cycle, and return the next NUMBEROFDATES;
export async function generateDates(recurrentObjectRule, cycleNumber, time, numberOfDates){
    // console.log('generating Dates:', recurrentObjectRule, cycleNumber)
    let numberOfIterations = cycleNumber * numberOfDates;
    let alldates = recurrentObjectRule.next(numberOfIterations);
    let dates = [];
    let j = 0;
    let i = 0;
    console.log(alldates);
    while (numberOfIterations > j) {
        if (dates.length > 10) {
            break;
        } else if (i === cycleNumber-1) {
            let d = new Date(alldates[j]);
            let  t = time.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
            d.setHours( parseInt( t[1]) + (t[3] ? 12 : 0) );
            d.setMinutes( parseInt( t[2]) || 0 );
            console.log(d);
            dates.push(d);
            i = 0;
        } else {
            i++;
        }
        j++;
    }
    return dates
}

//Get the next date in .getTime() format
// export async function generateNextTime(recurrentObject, time) {
//
//
//
// }
