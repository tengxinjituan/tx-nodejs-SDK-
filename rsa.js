'use strict';
const NodeRSA = require('node-rsa');

function encrypt(public_key, message) {
    var crypto = new NodeRSA(public_key);
    crypto.setOptions({ encryptionScheme: 'pkcs1' });
    return crypto.encrypt(message, 'base64');
}

module.exports = encrypt;
