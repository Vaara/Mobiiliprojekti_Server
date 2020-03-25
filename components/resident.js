const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(400); 
});

router.get('/:residentId', (req, res) => {
    db.query('SELECT * FROM Residents WHERE idResidents = ?', [req.params.residentId])
    .then(results => {
        res.json({ results });
    }).catch(() => {
        res.sendStatus(500);
    });
});

module.exports = router;