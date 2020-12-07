const express = require('express');
const router = express.Router();

const {checkNumber, getNumberNationality} = require('../services/phone');
const {checkFBIMostWanted} = require('../services/fbi');
const {getIpCountry} = require('../services/ip');
const {getData, saveReport} = require('../services/index')

router.get('/hello', async (req, res) => {
    try {
        res.send({hello: true});
    }
    catch(err) {
        console.log(err)
        res.status(500).send('error')
    }
})

router.post('/report', async (req, res) => {
    try {

        const {name, phone, ip, text} = getData(req);

        if (!checkFBIMostWanted(name)) {
            console.log('Bad name');
            res.status(422).send({'msg': 'Bad name'});
            return;
        }

        if (!checkNumber(phone)) {
            console.log('Bad phone number');
            res.status(422).send({'msg': 'Bad phone number'});
            return;
        }

        const phoneCountry = getNumberNationality(phone);
        const ipCountry = await getIpCountry(ip);
        
        const jsonBody = {name, phone, phoneCountry, ipCountry, text};
        console.log(jsonBody);
        saveReport(jsonBody);

        res.send({'msg': 'Report saved'});
    }
    catch(error) {
        console.log('Rout /report error:');
        console.log(error);
        res.status(500).send('error')
    }
})

module.exports = router;