const express = require('express')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const moment = require('moment')
const crypto = require('crypto')
const cors = require('cors')
var utils = require('./utils.js')
const model = require('./model.js')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
//url per la connessione al database online utilizzato nel progetto
const url = 'mongodb://testuserdb:te5tu5erdb@ds127634.mlab.com:27634/gs_users_db'
let app = express()
//configurazione per l'utilizzo della libreria di visualizzazione della documentazione sulle api
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//set up utile nel caso di cross-origin request
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,POST,DELETE"
}))
app.use(bodyParser.json())


mongodb.MongoClient.connect(url, { useNewUrlParser: true }, (error, db) => {


    if (error) return process.exit(1)

    const myDB = db.db('gs_users_db')
    app.get('/:user/', (req, res, next) => {

        //avvio gestione richiesta get
        console.log("/**RICHIESTA GET start**/")
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        var username = req.params.user;
        var password = req.headers['user-auth']
       //controllo username e password, se valorizzati
        if (!username || username === "" || !password || password === "") {
            console.log("/**RICHIESTA GET end**/")
            return res.status(400).send({ "action": "read", "output": "ko", "error": "credenziali incomplete." })
        } else {
            //controllo presenza documento relativo all'utente nel db
            myDB.collection('users')
                .find({ "username": username })
                .toArray((error, user) => {

                    if (error) return next(error)

                    if (!user.length > 0) {
                        console.log("/**RICHIESTA GET end**/")
                        res.status(404).send({ "action": "read", "output": "ko", 'error': 'utente non trovato.' })

                    } else {
                        //controllo matching tra l'hash della password memorizzata e quella inviata
                        if (user[0].password !== password) {
                            console.log("/**RICHIESTA GET end**/")
                            return res.status(403).send({ "action": "read", "output": "ko", "error": "credenziali non corrette." })
                        } else {

                            var userToBeSent = Object.assign({}, user[0], { _id: undefined, password: undefined });
                            console.log("/**RICHIESTA GET end**/")
                            res.status(200).send(userToBeSent)
                        }
                    }



                })
        }




    })
    app.post('/', (req, res, next) => {
 //avvio gestione richiesta post
 console.log("/**RICHIESTA POST start**/")
        let reqBody = req.body
        if (!reqBody) {
            console.log("/**RICHIESTA POST end**/")
            return res.status(400).send({ "action": "create", "output": "ko", "error": "nessun dato ricevuto." })
        } else {

            //confronto chiavi dell'oggetto ricevuto e dell'oggetto che rappresenta le info utente
            utils.validatePostInput(reqBody, model).then((validation) => {


                if (!validation) {
                    console.log("/**RICHIESTA POST end**/")
                    return res.status(400).send({ "action": "create", "output": "ko", "error": "informazioni incomplete o eccedenti quelle richieste." })
                } else {
                    res.setHeader("Content-Type", "text/json");
                    res.setHeader("Access-Control-Allow-Origin", "*");

                    //verifica se utente sia già presente nel database
                    myDB.collection('users').find({ "username": reqBody.username }).toArray((error, docs) => {

                        if (error) next(error)
                        if (docs.length > 0) {
                            console.log("/**RICHIESTA POST end**/")
                            res.status(400).send({ "action": "create", "output": "ko", "error": "nome utente esistente." })
                        } else {

                           
                            utils.decodeObj(reqBody).then((newObj) => {
                                let newUser = newObj;

                                //verifica che la password inoltrata corrisponda al pattern imposto (almeno 8 caratteri, di cui almeno uno numerico)
                                var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                                if (reqBody.password.match(regex)) {

                                    //trasformazione password attraverso una funzione hash crittografica sha-256
                                    let pwdhash = crypto.createHash('sha256').update(reqBody.password, 'utf-8').digest('hex')
                                    newUser.data_creazione = moment().toISOString();
                                    newUser.password = pwdhash

                                    //validazione collection(db) contenente le info utente
                                    myDB.command({
                                        collMod: "users",
                                        validator: {
                                            $and: [
                                                {
                                                    nome: {
                                                        $type: "string",
                                                        $exists: true
                                                    }
                                                },
                                                {
                                                    cognome: {
                                                        $type: "string",
                                                        $exists: true
                                                    }
                                                }, {
                                                    email: {
                                                        $type: "string",
                                                        $regex: /^.+\@.+$/,
                                                        $exists: true
                                                    }
                                                }, {
                                                    strada: {
                                                        $type: "string",
                                                        $exists: true
                                                    }
                                                }, {
                                                    civico: {
                                                        $type: "string",
                                                        $exists: true
                                                    }
                                                }, {
                                                    citta: {
                                                        $type: "string",
                                                        $exists: true
                                                    }
                                                }, {
                                                    cap: {
                                                        $type: "string",
                                                        $exists: true,
                                                        $regex: /^\d{5}$/
                                                    }
                                                }, {
                                                    prov: {
                                                        $type: "string",
                                                        $exists: true,
                                                        $regex: /^[a-zA-Z]{2,3}$/

                                                    }
                                                }



                                            ]
                                        },
                                        validationAction: "error",
                                        validationLevel: "strict"
                                    }, () => {



                                        //inserimento info utente nel database
                                        myDB.collection('users').insertOne(newUser, (error, results) => {



                                            if (error) {
                                                console.log("/**RICHIESTA POST end**/")
                                                res.status(400).send({ "action": "create", "output": "ko", "error": "validazione campi fallita." })
                                            } else {
                                                console.log("/**RICHIESTA POST end**/")
                                                res.status(200).send({ "action": "create", "output": "ok" })
                                            }


                                        })




                                    })




                                } else {
                                    console.log("/**RICHIESTA POST end**/")
                                    res.status(400).send({ "action": "create", "output": "ko", "error": "validazione campi fallita." })
                                }



                            })





                        }
                    })
                }





            })





        }







    })
    app.put('/:user/', (req, res, next) => {

        //avvio gestione richiesta put
        console.log("/**RICHIESTA PUT start**/")
        let reqBody = req.body

        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        var username = req.params.user;
        var password = req.headers['user-auth']
        //controllo username e password, se valorizzati
        if (!username || username === "" || !password || password === "") {
            console.log("/**RICHIESTA PUT end**/")
            return res.status(400).send({ "action": "update", "output": "ko", "error": "credenziali incomplete." })
        } else {
            //verifica se utente sia già presente nel database
            myDB.collection('users')
                .find({ "username": username })
                .toArray((error, user) => {


                    if (error) return next(error)
                    if (!user.length > 0) {
                        console.log("/**RICHIESTA PUT end**/")
                        res.status(404).send({ "action": "update", "output": "ko", 'error': 'utente non trovato' })

                    } else {
                        //controllo matching tra l'hash della password memorizzata e quella inviata
                        if (user[0].password !== password) {
                            console.log("/**RICHIESTA PUT end**/")
                            return res.status(403).send({ "action": "update", "output": "ko", "error": "credenziali non corrette" })
                        } else {
                            //confronto chiavi dell'oggetto ricevuto e dell'oggetto che rappresenta le info utente
                            utils.validateUpdateInput(reqBody, model).then((validate) => {
                                if (!validate) {
                                    console.log("/**RICHIESTA PUT end**/")
                                    return res.status(400).send({ "action": "update", "output": "ko", "error": "informazioni eccedenti quelle richieste" })
                                } else {


                                    utils.decodeObj(reqBody).then((newObj) => {
                                        let userNewData = newObj
                                        if (userNewData.hasOwnProperty("password")) {
                                            //verifica che la password inoltrata corrisponda al pattern imposto (almeno 8 caratteri, di cui almeno uno numerico)
                                            var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                                            if (userNewData.password.match(regex)) {
                                                //trasformazione password attraverso una funzione hash crittografica sha-256
                                                let pwdhash = crypto.createHash('sha256').update(userNewData.password, 'utf-8').digest('hex')
                                                userNewData.password = pwdhash
                                            } else {
                                                console.log("/**RICHIESTA PUT end**/")
                                                res.status(400).send({ "action": "create", "output": "ko", "error": "validazione campi fallita" })
                                            }

                                        }

                                        var toUpdateObj = Object.assign({}, user[0], { _id: undefined })
                                        utils.mergeObj(toUpdateObj, userNewData).then((mergedObj) => {

                                            var updatedObj = mergedObj;
                                            updatedObj["_id"] = user[0]["_id"]
                                            //validazione collection(db) contenente le info utente
                                            myDB.command({
                                                collMod: "users",
                                                validator: {
                                                    $and: [
                                                        {
                                                            nome: {
                                                                $type: "string",
                                                                $exists: true
                                                            }
                                                        },
                                                        {
                                                            cognome: {
                                                                $type: "string",
                                                                $exists: true
                                                            }
                                                        }, {
                                                            email: {
                                                                $type: "string",
                                                                $regex: /^.+\@.+$/,
                                                                $exists: true
                                                            }
                                                        }, {
                                                            strada: {
                                                                $type: "string",
                                                                $exists: true
                                                            }
                                                        }, {
                                                            civico: {
                                                                $type: "string",
                                                                $exists: true
                                                            }
                                                        }, {
                                                            citta: {
                                                                $type: "string",
                                                                $exists: true
                                                            }
                                                        }, {
                                                            cap: {
                                                                $type: "string",
                                                                $exists: true,
                                                                $regex: /^\d{5}$/
                                                            }
                                                        }, {
                                                            prov: {
                                                                $type: "string",
                                                                $exists: true,
                                                                $regex: /^[a-zA-Z]{2,3}$/

                                                            }
                                                        }



                                                    ]
                                                },
                                                validationAction: "error",
                                                validationLevel: "strict"
                                            }, () => {

                                                //aggiornamento info relative all'utente
                                                myDB.collection('users').update({ _id: user[0]["_id"] }, { $set: updatedObj }, (error, results) => {

                                                    if (error) {
                                                        console.log("/**RICHIESTA PUT end**/")
                                                        res.status(400).send({ "action": "update", "output": "ko", "error": "validazione campi fallita" })
                                                    } else {
                                                        console.log("/**RICHIESTA PUT end**/")
                                                        res.status(200).send({"action": "update", "output": "ok", "nome": updatedObj.nome,
                                                            "cognome": updatedObj.cognome
                                                        })
                                                    }



                                                })


                                            })






                                        })



                                    })




                                }


                            })






                        }

                    }



                })

        }










    })
    app.delete('/:user/', (req, res, next) => {
        //gestione richiesta delete
        console.log("/**RICHIESTA DELETE start**/")
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        var username = req.params.user
        var password = req.headers['user-auth']
        //controllo username e password, se valorizzati
        if (!username || username === "" || !password || password === "") {
            console.log("/**RICHIESTA DELETE end**/")
            return res.status(400).send({ "action": "delete", "output": "ko", "error": "credenziali incomplete." })
        } else {
            //verifica presenza utente nel database
            myDB.collection('users')
                .find({ "username": username })
                .toArray((error, user) => {


                    if (error) return next(error)
                    if (!user.length > 0) {
                        console.log("/**RICHIESTA DELETE end**/")
                        res.status(404).send({ "action": "delete", "output": "ko", 'error': 'utente non trovato.' })

                    } else {
                        //controllo matching tra l'hash della password memorizzata e quella inviata
                        if (user[0].password !== password) {
                            console.log("/**RICHIESTA DELETE end**/")
                            return res.status(403).send({ "action": "delete", "output": "ko", "error": "credenziali non corrette." })
                        } else {

                            //rimozione informazioni relative all'utente
                            myDB.collection('users').deleteOne({ _id: user[0]["_id"] }, (error, results) => {

                                if (error) return next(error)

                                console.log("/**RICHIESTA DELETE end**/")
                                res.status(200).send({ "action": "delete", "output": "ok", "nome": user[0].nome, "cognome": user[0].cognome })


                            })


                        }

                    }



                })
        }
















    })
    app.use((err, req, res, next) => {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");

        res.status(500).send({ "output": "ko", "error": err.toString() })

    })
    app.listen(3333)


})