const express = require('express');
const router = express.Router();

const {checkNumber, getNumberNationality} = require('../services/phone');
const {checkFBIMostWanted} = require('../services/fbi');

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
        const {name, phone} = req.body;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (!checkFBIMostWanted(name)) {
            res.status(422).send({'msg': 'Bad name'});
            return;
        }

        if (!checkNumber(phone)) {
            res.status(422).send({'msg': 'Bad phone number'});
            return;
        }

        const country = getNumberNationality(phone);

        const jsonBody = {name, phone, country};
        console.log(jsonBody);
        console.log(ip)
        res.send({'msg': 'Report saved'});
    }
    catch(error) {
        console.log('Rout /report error:');
        console.log(error);
    }
})

module.exports = router;