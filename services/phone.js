const parsePhoneNumber = require('libphonenumber-js');

const checkNumber = (phone) => {
    try {
        const phoneNumber = parsePhoneNumber(phone);
        
        if (phoneNumber !== undefined)
            return phoneNumber.isValid();

        return false;
    }
     catch(error) {
         console.log('Check number error:')
         console.log(error);
         return false;
     }
}

const getNumberNationality = (phone) => {
    try {
        const phoneNumber = parsePhoneNumber(phone);
        return phoneNumber.country;
    }
    catch(error) {
        console.log('Number country error:')
        console.log(error);
        return '';
    }
}

module.exports = {checkNumber, getNumberNationality}