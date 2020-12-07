const fs = require('fs');
const axios = require('axios');
const cron = require('node-cron');

const dataPath = './data/FBIMostWanted.json';

const storeFBIMostWanted = async () => {

    try {
        
        const resFBI = await axios.get('https://api.fbi.gov/wanted/v1/list');
        const resFBIString = JSON.stringify(resFBI.data);
        fs.writeFileSync(dataPath, resFBIString);
        console.log('Loaded FBI data');

    } catch (error) {
        console.log('Error with FBI API:');
        console.log(error);
    }
}

const checkFBIMostWanted = (name) => {

    try {
        const rawData = fs.readFileSync(dataPath);
        let FBIMostWanted = JSON.parse(rawData);
        const found = FBIMostWanted.items.find((element) => element.title === name);
        return found !== undefined;
    } catch (error) {
        console.log('Error with FBI reading from file:');
        console.log(error);
    }
}

const setCronJob = async () => {
    await storeFBIMostWanted();
    cron.schedule('0 0 */24 * * *', () => {
        storeFBIMostWanted();
    });
}

module.exports = {setCronJob, checkFBIMostWanted}