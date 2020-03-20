const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(400); 
});

router.get('/:serviceAdviceId', (req, res) => {
    db.query('SELECT * FROM ServiceAdvices WHERE idHousingCooperative = ?', [req.params.serviceAdviceId])
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

module.exports = router;