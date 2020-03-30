const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(400); 
});

router.get('/:serviceAdviceId', (req, res) => {
    db.query('SELECT * FROM ServiceAdviceReports WHERE idServiceAdvices = ?', [req.params.serviceAdviceId])
    .then(results => {
        res.json({ results });
    }).catch(() => {
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    db.query('INSERT INTO ServiceAdviceReports (idServiceAdvices, idCustodians, CustodianReport) VALUES (?, ?, ?)',
    [req.body.idServiceAdvices, req.body.idCustodians, req.body.CustodianReport]).then(() => {
        //
        db.query('UPDATE ServiceAdvices SET Done = ? WHERE idServiceAdvices = ?', [1, req.body.idServiceAdvices])
        .then(() => {
            //
        }).catch(() => {
            res.sendStatus(500);
        });
        res.sendStatus(201);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;