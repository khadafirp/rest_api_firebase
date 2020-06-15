const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express');
const cors = require('cors');

const app = express();
admin.initializeApp();

app.post("/", async (req, res) => {
    const db = admin.firestore();
    const user = req.body;
    
    await db.collection("user_admin").add(user);

    res.status(200).send("Data has been added")

})

app.get("/user", async (req, res) => {
    const snapshot = await admin.firestore().collection("user_admin").get();

    let users = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        users.push({id, ...data})
    })

    res.status(200).send(JSON.stringify(users))
})

app.post("/filterData", async (req, res) => {
    var snapshot = await admin.firestore().collection('user_admin').get();
    
    // const userId = snapshot.username;
    // const userData = snapshot.data();

    let users = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        users.push({id, ...data})
    })
    

    var dataUser = users.filter(function(item){
        return item.username === req.body.username
    })
    
    res.send(dataUser);
  })

app.delete("/deleteUser/:id", async (req, res) => {
    await admin.firestore().collection("user_admin").doc(req.params.id).delete();
    
    res.status(200).send("Data has been deleted");
})

exports.user = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
