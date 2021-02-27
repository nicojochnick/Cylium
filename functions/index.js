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

exports.scheduledFunction = functions.pubsub.schedule('0 0 * * *').onRun((context) => {
    let db = admin.firestore();
    //STEP ONE: Check if conditions match on any trackers
    db.collection('trackers')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let id = doc.id;
            let tracker = doc.data();
            // let rec = JSON.parse(tracker.recurrence)
            console.log(id)
          });
        })
        .catch(reason => {
          console.log('db.collection error, reason: ' + reason);
        });

    //STEP TWO: IF they do, send a message
    let res = db.collection('message').doc('test2').set({
      name: 'test'
    }).then(() => {
          console.log("Document successfully written!");
    }).catch((error) => {
          console.error("Error writing document: ", error);
    });

    console.log('every five minutes create;', res);

    return null;
});





