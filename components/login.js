const express = require('express');
const db = require('../db');
const router = express.Router();

const RESIDENT = 0;
const CUSTODIAN = 1;


router.post('/', (req, res) => {
    let userId = "";
    let userLevel = "";
    let userFullName = "";
    let userHousingCooperativeId = "";
    const username = req.body.username;
    const password = req.body.password;
    if (username == null || password == null) {
        res.sendStatus(400);
    }
    else {
        // Residents Query
        db.query('SELECT * FROM Residents').then(results => {
            for (let i = 0; i < results.length; i++) {
                if (username == results[i].Username && password == results[i].Password) {
                    userId = results[i].idResidents;
                    userLevel = RESIDENT;
                    userFullName = results[i].Name;
                    userHousingCooperativeId = results[i].idHousingCooperative;
                }
            }
            // Custodians Query
            db.query('SELECT * FROM Custodians').then(results => {
                for (let i = 0; i < results.length; i++) {
                    if (username == results[i].Username && password == results[i].Password) {
                        userId = results[i].idCustodians;
                        userLevel = CUSTODIAN;
                        userFullName = results[i].Name;
                        userHousingCooperativeId = results[i].idPropertyMaintenance;
                    }
                }
                // Check if user found or not
                if (userId.length < 1) {
                    res.sendStatus(404);
                } else {
                    if (userLevel == 0) {
                        res.json({ userId, userLevel, userFullName, userHousingCooperativeId });
                    }
                    else if (userLevel == 1) {
                        res.json({ userId, userLevel, userFullName, "userPropertyMaintenanceId" : userHousingCooperativeId });
                    }
                    
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
