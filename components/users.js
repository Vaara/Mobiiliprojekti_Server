const express = require('express');
const db = require('../db');
const router = express.Router();

const RESIDENT = 0;
const CUSTODIAN = 1;


router.get('/', (req, res) => {
    let userId = "";
    let userLevel = "";
    let userFullName = "";
    const username = req.body.username;
    const password = req.body.password;
    if (username == null || password == null) {
        res.send("Missing username or password");
    }
    else {
        // Residents Query
        db.query('SELECT * FROM Residents').then(results => {
            for (let i = 0; i < results.length; i++) {
                if (username == results[i].Username && password == results[i].Password) {
                    userId = results[i].idResidents;
                    userLevel = RESIDENT;
                    userFullName = results[i].Name;
                }
            }
            // Custodians Query
            db.query('SELECT * FROM Custodians').then(results => {
                for (let i = 0; i < results.length; i++) {
                    if (username == results[i].Username && password == results[i].Password) {
                        userId = results[i].idCustodians;
                        userLevel = CUSTODIAN;
                        userFullName = results[i].Name;
                    }
                }
                // Check if user found or not
                if (userId.length < 1) {
                    res.sendStatus(404);
                } else {
                    res.json({ userId, userLevel });
                }
            }).catch(() => { // Query2 CATCH
                res.sendStatus(500);
            });

        }).catch(() => { // Query1 CATCH
            res.sendStatus(500);
        });
    }
});

module.exports = router;
