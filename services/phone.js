const parsePhoneNumber = require('libphonenumber-js');

const checkNumber = (phone) => {
    const phoneNumber = parsePhoneNumber(phone);
    
    if (phoneNumber !== undefined)
        return phoneNumber.isValid();

    return false;
}

const getNumberNationality = (phone) => {
    const phoneNumber = parsePhoneNumber(phone);
    return phoneNumber.country;
}

module.exports = {checkNumber, getNumberNationality}