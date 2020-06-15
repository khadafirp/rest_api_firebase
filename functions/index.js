const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express');
const cors = require('cors');

const app = express();
admin.initializeApp();

app.post("/addUser", async (req, res) => {
    const db = admin.firestore();
    const user = 
        {
            username: req.body.username,
            password: req.body.password,
            posisi: req.body.posisi,
            nama_lengkap: req.body.nama_lengkap,
            tanggal_lahir: req.body.tanggal_lahir,
            no_hp: req.body.no_hp,
            alamat: req.body.alamat,
            status_aktif: req.body.status_aktif
        };
    
    await db.collection("user_admin").add(user);

    try{
        res.status(200).send(
            {
                statusCode: 200,
                message: "success"
            }
        )
    }catch(error){
        res.status(500).send(
            {
                statusCode: 500,
                message: "internal server error"
            }
        )
    }
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

app.post("/filterDataUser", async (req, res) => {
    var snapshot = await admin.firestore().collection('user_admin').get();
    
    // const userId = snapshot.username;
    // const userData = snapshot.data();

    let users = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        users.push({id, ...data})
    })
    

    // var dataUser = users.filter(function(item){
    //     return item.username === req.body.username
    // })

    var dataUser = users.find(c => c.username === req.body.username)

    if(!dataUser){
        res.status(404).send(
            {
                statusCode: 404,
                message: "Data is not found"
            }
        )
    }else{
        res.send(JSON.stringify(dataUser).replace("[", "").replace("]", ""));
    }
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
