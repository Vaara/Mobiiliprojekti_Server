const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const componentLogin = require('./components/login');
const componentResident = require('./components/resident.js');
const componentCustodian = require('./components/custodian.js');
const componentHousingCooperative = require('./components/housingcooperative.js');
const componentPropertyMaintenance = require('./components/propertymaintenance.js');
const componentServiceAdvice = require('./components/serviceadvice.js');
const componentServiceAdviceReport = require('./components/serviceadvicereport.js');
const componentCustodianBulletinBoard = require('./components/custodianbulletinboard.js');
const componentResidentBulletinBoard = require('./components/residentbulletinboard.js');

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("Nothing here.");
});

// Components
app.use('/login', componentLogin);
app.use('/resident', componentResident);
app.use('/custodian', componentCustodian);
app.use('/housingcooperative', componentHousingCooperative);
app.use('/propertymaintenance', componentPropertyMaintenance);
app.use('/serviceadvice', componentServiceAdvice);
app.use('/serviceadvicereport', componentServiceAdviceReport);
app.use('/custodianbulletinboard', componentCustodianBulletinBoard);
app.use('/residentbulletinboard', componentResidentBulletinBoard);


app.listen(port, () => {
    console.log(`Listening port: ${port}\n`);
});