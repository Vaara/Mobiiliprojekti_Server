const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(400); 
});

router.get('/:housingCooperativeId', (req, res) => {
    db.query('SELECT * FROM ResidentBulletinBoard WHERE idHousingCooperative = ?', [req.params.housingCooperativeId])
    .then(results => {
        res.json({ results });
    }).catch(() => {
        res.sendStatus(500);
    });
});

module.exports = router;