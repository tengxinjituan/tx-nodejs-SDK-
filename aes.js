'use strict';

const crypto = require('crypto');

function encrypt(data, key) {
    var cipher = crypto.createCipheriv('AES-128-ECB', key, '');
    var array = new Array();
    array.push(cipher.update(data, "utf8", "base64"))
    array.push(cipher.final("base64"))
    return array.join('')
}

function decrypt(data, key) {
    var decipher = crypto.createDecipheriv('AES-128-ECB', key, '');
    var array = new Array();
    array.push(decipher.update(data, "base64", "utf8"))
    array.push(decipher.final("utf8"))
    return array.join('');
}

module.exports = { encrypt: encrypt, decrypt: decrypt };