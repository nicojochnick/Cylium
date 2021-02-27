
import moment from 'moment'
require('moment-recur');



//Take in a recurring object rule, and a cycle, and return the next 10 dates
export async function generateDates(recurrentObjectRule, cycleNumber){
    let numberOfIterations = cycleNumber * 10;
    let alldates = recurrentObjectRule.next(numberOfIterations);
    let dates = [];
    let j = 0;
    let i = 0;
    while (numberOfIterations > j) {
        if (dates.length > 10) {
            break;
        } else if (i === cycleNumber-1) {
            dates.push(new Date(alldates[j]));
            i = 0;
        } else {
            i++;
        }
        j++;
    }
    return dates
};
