const express = require('express');
const router = express.Router();

router.get('/hello', async (req, res) => {
    try {
        res.send({hello: true});
    }
    catch(err) {
        console.log(err)
        res.status(500).send('error')
    }
})

module.exports = router;