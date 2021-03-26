const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// const {generateNextTime} = require( "./helper/dateManager");
const moment = require('moment');
require('moment-recur');


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    console.log('firebase console');
    response.send("Hello from Firebase!");
});

exports.scheduledFunction = functions.pubsub.schedule('0 0 * * *').onRun(async (context) => {
    let db = admin.firestore();
    let lowerBound_DateTime = new Date().getTime();
    let upperBound_DateTime = new Date(lowerBound_DateTime + 300000).getTime();
    //STEP ONE: Check if conditions match on any trackers
    await db.collection('trackers')
        .get()
        .then(snapshot => {
            snapshot.forEach(async doc => {
                let id = doc.id;
                let tracker = doc.data();
                let dates = tracker.dates;
                let nextSendDateTime = tracker.nextDateTime;
                console.log('pulled from tracker: ' + nextSendDateTime);
                if (nextSendDateTime) {
                    let time = tracker.time;
                    let trackerDateTime = nextSendDateTime.toDate().getTime();
                    console.log(lowerBound_DateTime, trackerDateTime, upperBound_DateTime);
                    //STEP TWO: IF they do, update Next DateTime and send a message
                    if (lowerBound_DateTime <= trackerDateTime && trackerDateTime <= upperBound_DateTime) {
                        console.log('recurrence triggered!');
                        console.log('updating nextDateTime');
                        let nextNewDateTime = await generateNextTime(tracker.recurrence, 1);
                        console.log(nextNewDateTime);

                        let nextDateTimeUpdateResponse = db.collection('trackers').doc(id).update({
                            nextDateTime: nextNewDateTime
                        }).then(() => {
                            console.log("nextDateTime Successfully Updated to: " + nextNewDateTime);
                        }).catch((error) => {
                            console.error("Error writing document: ", error);
                        });

                        console.log('creating message');

                        let sendMessageResponse = db.collection('messages').doc('test3').set({
                            name: 'test3'
                        }).then(() => {
                            console.log("Message successfully written!");
                        }).catch((error) => {
                            console.error("Error writing document: ", error);
                        });

                        return null;


                    } else {
                        console.log('not in frame')
                    }
                } else {
                    console.log('error: nextDateTime is Null')
                }
            });
        })
        .catch(reason => {
            console.log('could not pull tracker collection, reason: ' + reason);
        });
});




//Get the next date in .getTime() format
async function generateNextTime(recurrenceObject,numberOfDates) {
    let generatedDate = null;
    let cycle = recurrenceObject.cycle;
    let cycleNumber = recurrenceObject.cycleNumber;
    let monthlyDay = recurrenceObject.monthlyDay;
    let monthlyWeek = recurrenceObject.monthlyWeek;
    let weeklyDays = recurrenceObject.weeklyDays;

    let time = recurrenceObject.time;
    let myDate = moment();

    console.log('cycle is: ' + cycle + ' time is: ' + 'time')
    if (cycle === 'day'){

    } else if (cycle === 'week') {
        let days = [];
        let match =  { 'Sunday': 1, 'Monday': 2, 'Tuesday': 3, 'Wednesday': 4, 'Thursday': 5, 'Friday': 6, 'Saturday': 0,};
        let i = 0;
        for (i of weeklyDays){
            days.push(match[i])
        }
        let nonCycleRecurrence = await myDate.recur().every(days).daysOfWeek();
        console.log('rule created: ' + nonCycleRecurrence)
        generatedDate = await generateDates(nonCycleRecurrence, cycleNumber, time, numberOfDates);

    } else if (cycle === 'month') {

    } else {
        console.log('error: no cycle present')
    }
    if (generatedDate) {
        return generatedDate[0];

    } else {
        console.log('generator function failed');
        return null
    }

}


//Take in a recurring object rule, and a cycle, and return the next 10 dates
function generateDates(recurrentObjectRule, cycleNumber, time, numberOfDates){
    // console.log('generating Dates:', recurrentObjectRule, cycleNumber)
    console.log('generatingDate')
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
    console.log('generated dates: '+ dates);
    return dates
}
