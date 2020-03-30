const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(400); 
});

router.get('/:custodianId', (req, res) => {
    db.query('SELECT * FROM Custodians WHERE idCustodians = ?', [req.params.custodianId])
    .then(results => {
        res.json({ results });
    }).catch(() => {
        res.sendStatus(500);
    });
});

module.exports = router;