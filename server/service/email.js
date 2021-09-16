const crypto = require('crypto');


const sendingEmail = () => {
    const token = crypto.randomBytes(32).toString('hex');
    console.log(`Email:: 127.0.0.1:5000/api/v1/auth/change-password?token=${token}`)
    return token
}

module.exports = sendingEmail