const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const moment = require('moment');



// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  console.log('firebase console');
  response.send("Hello from Firebase!");
});

exports.scheduledFunction = functions.pubsub.schedule('* * * * *').onRun((context) => {
    let db = admin.firestore();
    //STEP ONE: Check if conditions match on any trackers
    db.collection('trackers')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let id = doc.id;
            let tracker = doc.data();
            let dates = tracker.dates;
            let nextSendDateTime = tracker.nextSendDateTime;
            let time = tracker.time;
            let lowerBound_DateTime = new Date().getTime();
            let upperBound_DateTime = new Date(current_DateTime + 5 * 60000);
              //STEP TWO: IF they do, send a message
              if (lowerBound_DateTime <= nextSendDateTime <= upperBound_DateTime) {
                console.log('matchingDateTime, creating message');
                let res = db.collection('message').doc('test3').set({
                    name: 'test3'
                }).then(() => {
                    console.log("Message successfully written!");
                }).catch((error) => {
                    console.error("Error writing document: ", error);
                });
                return null;
            }
              //TODO: STEP Three: remove the first node from the stack, if the stack is now empty, generate 10 more.
          });
        })
        .catch(reason => {
          console.log('could not pull tracker collection, reason: ' + reason);
        });


});





