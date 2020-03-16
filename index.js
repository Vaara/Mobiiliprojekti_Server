const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const componentUsers = require('./components/users');

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("Nothing here.");
});

// Components
app.use('/users', componentUsers);


app.listen(port, () => {
    console.log(`Listening port: ${port}\n`);
});