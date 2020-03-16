const express = require('express');
const db = require('../db');
const router = express.Router();

const USER1 = 0;
const USER2 = 1;


router.get('/', (req, res) => {
    let userId = "";
    let userLevel = "";
    const username = req.body.username;
    const password = req.body.password;
    if (username == null || password == null) {
        res.send("Missing username or password");
    }
    else {
        // Users1 Query
        db.query('SELECT * FROM users1').then(results => {
            for (let i = 0; i < results.length; i++) {
                if (username == results[i].username && password == results[i].password) {
                    userId = results[i].idUsers1;
                    userLevel = USER1;
                }
            }
            // Users2 Query
            db.query('SELECT * FROM users2').then(results => {
                for (let i = 0; i < results.length; i++) {
                    if (username == results[i].username && password == results[i].password) {
                        userId = results[i].idUsers2;
                        userLevel = USER2;
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
