const fs = require('fs');
const axios = require('axios');

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

const checkFBIMostWanted = async (name) => {

    try {
        const rawData = fs.readFileSync(dataPath);
        let FBIMostWanted = JSON.parse(rawData);
        const found = FBIMostWanted.items.find((element) => element.title === name);
        console.log(found);
        return found;
    } catch (error) {
        console.log('Error with FBI reading from file:');
        console.log(error);
    }
}

module.exports = {storeFBIMostWanted, checkFBIMostWanted}