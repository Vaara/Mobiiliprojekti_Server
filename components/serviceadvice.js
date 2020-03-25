const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(400); 
});

router.get('/:serviceAdviceId', (req, res) => {
    db.query('SELECT * FROM ServiceAdvices WHERE idHousingCooperative = ?', [req.params.serviceAdviceId])
    .then(results => {
        res.json({ results });
    }).catch(() => {
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    if (req.body.MasterKeyAllowed < 0  || req.body.MasterKeyAllowed > 1) {
        res.sendStatus(400);
    }
    else if (req.body.ContactResident < 0 || req.body.ContactResident > 1) {
        res.sendStatus(400);
    }
    else {
        db.query('INSERT INTO ServiceAdvices (idResidents, idHousingCooperative, ServiceMessageTitle, ServiceMessage, AdditionalMessage, ImageId, MasterKeyAllowed, ContactResident)'
        + ' VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [req.body.idResidents, req.body.idHousingCooperative, req.body.ServiceMessageTitle, req.body.ServiceMessage, req.body.AdditionalMessage, req.body.ImageId, req.body.MasterKeyAllowed, req.body.ContactResident])
        .then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(500);
        });
    }
});

router.post('/done', (req, res) => {
    res.sendStatus(400);
});
router.post('/done/:idServiceAdvice', (req, res) => {
    db.query('UPDATE ServiceAdvices SET Done = ? WHERE idServiceAdvices = ?', [1, req.params.idServiceAdvice])
    .then(() => {
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(500);
    });
});

module.exports = router;