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

    var dataUser = users.find(c => (c.username === req.body.username) && (c.password === req.body.password))

    if(!dataUser){
        res.status(404).send(
            {
                statusCode: 404,
                message: "Data is not found"
            }
        )
    }else{
        res.send(
            {
                body: dataUser,
                statusCode: 200,
                message: "success"
            }
        )
    }
  })

//   app.put("/updateUser", async (req, res) => {

//     try{
    
//     const snapshot = await admin.firestore().collection("user_admin").get();
//     let users = [];
//     snapshot.forEach(doc => {
//         let id = doc.id;
//         let data = doc.data();

//         users.push({id, ...data})
//     })
//     const dataUser = users.find(c => c.username === req.query.username);

//     if(!dataUser){
//         res.status(404).send(
//             {
//                 statusCode: 404,
//                 message: "Data is not found"
//             }
//         )
//     }else{

//         const body = 
//             {
//                 nama_lengkap: req.body.nama_lengkap,
//                 no_hp: req.body.no_hp,
//                 alamat: req.body.alamat
//             }

//         await admin.firestore().collection("user_admin").doc(dataUser).update(body);

//         res.send(dataUser);
//         // })

//         // var dataUser = users.find(c => c.username === req.query.username)

//         // if(!dataUser){
//         //     res.status(404).send(
//         //         {
//         //             statusCode: 404,
//         //             message: "Data is not found"
//         //         }
//         //     )
//         // }else{
//         //     res.send(
//         //         {
//         //             body: dataUser,
//         //             statusCode: 200,
//         //             message: "success"
//         //         }
//         //     )
//         // }
//         }
//     }catch(error){
//         res.send(error);
//     }
//   })

app.delete("/deleteUser/:id", async (req, res) => {
    await admin.firestore().collection("user_admin").doc(req.params.id).delete();
    
    res.status(200).send("Data has been deleted");
})


//===================================================
//================== SEJARAH MASJID =================
//===================================================

app.post("/addSejarah", async (req, res) => {
    const db = admin.firestore();
    const sejarah = 
        {
            title: req.body.title,
            title_detail: req.body.title_detail
        };
    
    await db.collection("sejarah").add(sejarah);

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

app.get("/listSejarah", async (req, res) => {
    const snapshot = await admin.firestore().collection("sejarah").get();

    let sejarah = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        sejarah.push({id, ...data})
    })

    res.status(200).send(JSON.stringify(sejarah))
})

app.post("/filterSejarah", async (req, res) => {
    var snapshot = await admin.firestore().collection('sejarah').get();
    
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

    var dataSejarah = users.find(c => c.title === req.body.title)

    if(!dataSejarah){
        res.status(404).send(
            {
                statusCode: 404,
                message: "Data is not found"
            }
        )
    }else{
        res.send(
            {
                body: dataSejarah,
                statusCode: 200,
                message: "success"
            }
        )
    }
  })

  app.delete("/deleteSejarah/:id", async (req, res) => {
    await admin.firestore().collection("sejarah").doc(req.params.id).delete();
    
    res.status(200).send("Data has been deleted");
})



//============================================
//================ PENGURUS ==================
//============================================

app.post("/addPengurus", async (req, res) => {
    const db = admin.firestore();
    const user = 
        {
            nama_pengurus: req.body.nama_pengurus,
            jabatan: req.body.jabatan,
            alamat_pengurus: req.body.alamat_pengurus,
            no_hp_pengurus: req.body.no_hp_pengurus,
            foto: req.body.foto,
        };
    
    await db.collection("pengurus").add(user);

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

app.post("/addPengurusSort", async (req, res) => {
    const db = admin.firestore();
    const user = req.body;
    
    await db.collection("listPengurus").add(user);

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

app.get("/listPengurus", async (req, res) => {
    const snapshot = await admin.firestore().collection("pengurus").get();

    let pengurus = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        pengurus.push({id, ...data})
    })

    res.status(200).send(JSON.stringify(pengurus))
})

app.get("/listPengurusSort", async (req, res) => {
    const snapshot = await admin.firestore().collection("listPengurus").get();

    let pengurus = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        pengurus.push({id, ...data})
    })

    res.status(200).send(JSON.stringify(pengurus))
})

app.post("/filterPengurus", async (req, res) => {
    var snapshot = await admin.firestore().collection('pengurus').get();
    
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

    var dataPengurus = users.find(c => c.nama_pengurus === req.body.nama_pengurus)

    if(!dataPengurus){
        res.status(404).send(
            {
                statusCode: 404,
                message: "Data is not found"
            }
        )
    }else{
        res.send(
            {
                body: dataPengurus,
                statusCode: 200,
                message: "success"
            }
        )
    }
  })

app.delete("/deletePengurusSort/:id", async (req, res) => {
    await admin.firestore().collection("listPengurus").doc(req.params.id).delete();
    
    res.status(200).send("Data has been deleted");
})



//============================================
//================ JADWAL ==================
//============================================

app.post("/addKategoriJadwal", async (req, res) => {
    const db = admin.firestore();
    const user = 
        {
            no_urut: req.body.no_urut,
            kategori: req.body.kategori
        };
    
    await db.collection("jadwal").add(user);

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

app.post("/addJadwalMasjid", async (req, res) => {
    const db = admin.firestore();
    const data = 
        {
            no_urut: req.body.no_urut,
            kategori: req.body.kategori,
            title: req.body.title,
            tanggal: req.body.tanggal,
            detail_jadwal: req.body.detail_jadwal,
            lokasi: req.body.lokasi,
            waktu: req.body.waktu
        };
    
    await db.collection("jadwal_mjd").add(data);

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

app.get("/listKategoriJadwal", async (req, res) => {
    const snapshot = await admin.firestore().collection("jadwal").get();

    let pengurus = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        pengurus.push({id, ...data})
    })

    res.status(200).send(JSON.stringify(pengurus))
})

app.get("/listJadwalMasjid", async (req, res) => {
    const snapshot = await admin.firestore().collection("jadwal_mjd").get();

    let pengurus = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        pengurus.push({id, ...data})
    })


    res.status(200).send(JSON.stringify(pengurus))
})

app.post("/filterJadwal", async (req, res) => {
    var snapshot = await admin.firestore().collection('jadwal_mjd').get();
    
    let users = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        users.push({id, ...data})
    })
    
    var dataJadwal = users.filter(c => c.kategori === req.body.kategori);

    if(!dataJadwal){
        res.status(404).send(
            {
                statusCode: 404,
                message: "Data is not found"
            }
        )
    }else{
        res.send(
            {
                body: dataJadwal,
                statusCode: 200,
                message: "success"
            }
        )
    }
  })

  app.post("/filterDetailJadwal", async (req, res) => {
    var snapshot = await admin.firestore().collection('jadwal_mjd').get();
    
    let users = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        users.push({id, ...data})
    })
    
    var dataJadwal = users.find(c => c.title === req.body.title);

    if(!dataJadwal){
        res.status(404).send(
            {
                statusCode: 404,
                message: "Data is not found"
            }
        )
    }else{
        res.send(
            {
                body: dataJadwal,
                statusCode: 200,
                message: "success"
            }
        )
    }
  })

  app.delete("/deleteJadwal/:id", async (req, res) => {
    await admin.firestore().collection("jadwal_mjd").doc(req.params.id).delete();
    
    res.status(200).send("Data has been deleted");
})

exports.user = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
