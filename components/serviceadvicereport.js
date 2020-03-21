const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(400); 
});

router.get('/:serviceAdviceId', (req, res) => {
    db.query('SELECT * FROM ServiceAdviceReports WHERE idServiceAdvices = ?', [req.params.serviceAdviceId])
    .then(results => {
        if (results.length > 0) {
            res.json({ results });
        }
        else {
            res.sendStatus(404);
        }
    }).catch(() => {
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    db.query('INSERT INTO ServiceAdviceReports (idServiceAdvices, idCustodians, CustodianReport) VALUES (?, ?, ?)',
    [req.body.idServiceAdvices, req.body.idCustodians, req.body.CustodianReport]).then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;