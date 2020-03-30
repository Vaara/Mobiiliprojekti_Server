const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(400); 
});

router.get('/:propertyMaintenceId', (req, res) => {
    let queryMessage = " ";
    db.query('SELECT idHousingCooperative FROM HousingCooperative WHERE idPropertyMaintenance = ?', [req.params.propertyMaintenceId])
    .then(results => {
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                if (i == results.length - 1) {
                    queryMessage = queryMessage + results[i].idHousingCooperative;  
                }
                else {
                    queryMessage = queryMessage + results[i].idHousingCooperative + " OR ";
                }
            }
            queryMessage = "SELECT * FROM ServiceAdvices WHERE idHousingCooperative =" + queryMessage;
            db.query(queryMessage.toString()).then(results => {
                res.json({ results });
            }).catch((error) => {
                res.sendStatus(500);
                console.log(error);
            });
        }
        else { res.json({ results })
    }}).catch(() => {
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    if (req.body.MasterKeyAllowed < 0  || req.body.MasterKeyAllowed > 1 || typeof req.body.MasterKeyAllowed === 'undefined') {
        res.sendStatus(400);
    }
    else if (req.body.ContactResident < 0 || req.body.ContactResident > 1 || typeof req.body.ContactResident === 'undefined') {
        res.sendStatus(400);
    }
    else {
        db.query('INSERT INTO ServiceAdvices (idResidents, idHousingCooperative, ServiceMessageTitle, ServiceMessage, AdditionalMessage, ImageId, MasterKeyAllowed, ContactResident)'
        + ' VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [req.body.idResidents, req.body.idHousingCooperative, req.body.ServiceMessageTitle, req.body.ServiceMessage, req.body.AdditionalMessage, req.body.ImageId, req.body.MasterKeyAllowed, req.body.ContactResident])
        .then(() => {
            res.sendStatus(201);
        }).catch(() => {
            res.sendStatus(500);
        });
    }
});

module.exports = router;