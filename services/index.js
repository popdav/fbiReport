const fs = require('fs');
const config = require('../config.json')

const reportsPath = config.reportsDataPath;

const onStartCheck = () => {
    try {
        if (!fs.existsSync(reportsPath)) {
            fs.writeFileSync(reportsPath, '[\n]\n');
        }
    } catch(err) {
        console.error(err)
    }
}

const getData = (req) => {
    const ip = req.headers['x-forwarded-for'] || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
            
    const {name, phone} = req.body;

    let text = req.body.text;
    if (req.body.text === undefined)
        text = '';

    return {name, phone, ip, text};
}

const saveReport = (jsonBody) => {
    try {
        const stats = fs.statSync(reportsPath);
        const fileSizeInBytes = stats.size;
        const reportString = JSON.stringify(jsonBody);
        
        if (fileSizeInBytes <= 4) {
            fs.writeFileSync(reportsPath, '[\n');
            fs.appendFileSync(reportsPath, reportString);
            fs.appendFileSync(reportsPath, '\n]');
        } else {
            fs.truncateSync(reportsPath, fileSizeInBytes-2);
            fs.appendFileSync(reportsPath, ',\n');
            fs.appendFileSync(reportsPath, reportString);
            fs.appendFileSync(reportsPath, '\n]');
        }
    }
    catch(error) {
        console.log('Report save error:')
        console.log(error);
    }
}

module.exports = {getData, saveReport, onStartCheck};