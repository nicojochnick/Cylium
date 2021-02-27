
import moment from 'moment'
require('moment-recur');



//Take in a recurring object rule, and a cycle, and return the next 10 dates
export async function generateDates(recurrentObjectRule, cycleNumber){
    console.log('generating Dates:', recurrentObjectRule, cycleNumber)
    let numberOfIterations = cycleNumber * 10;
    let alldates = recurrentObjectRule.next(numberOfIterations);
    let dates = [];
    let j = 0;

    for (let i = 0; i <= cycleNumber; i++) {
        while (numberOfIterations > j) {
            if (dates.length > 10) {
                break;
            } else if (i === cycleNumber-1) {
                dates.push(new Date(alldates[j]));
                i = 0;
            }
            j++;
        }

    }
    console.log(dates)
    return dates
};
