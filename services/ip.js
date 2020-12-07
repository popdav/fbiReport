const axios = require('axios');

const getIpCountry = async (ip) => {
    try {
        const api_key = 'at_Z7EOCSdgaqNcwUbW1gTFRCSAPfnV6';
        const api_url = 'https://geo.ipify.org/api/v1?';

        const url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;

        const res = await axios.get(url);

        return res.data.location.country;
    }
    catch(error) {
        console.log('Get ip error:');
        console.log(error);
        return;
    }
}

module.exports = {getIpCountry};