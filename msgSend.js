'use strict';
const http = require('http');
const utils = require('./utils');
const aes = require('./aes');
const rsaEncrypt = require('./rsa');

//公钥
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCExkDB2nbdopq7lYgKhwzrVgMo
M7WJqz3THpMjGg0sGV6kydiYSXTc/+OdMUIaIWfuY0T2CLpKmrNG+4FHqMOfnCU7
1gqysbmd02zpNW+d9AtN07NoxeekgiWJxLtKI3LSaY/SgOjrpIDEFWXUTEZ7hNNw
ga1hRkfxliA1MSK2jQIDAQAB
-----END PUBLIC KEY-----`

function msgSend(account, password, phone, msg, uid) {
    var url = 'http://10.10.50.3:8082/msg/send/json'
    var body = {
        "account": account,//账号
        "password": password,//密码
        "msg": msg,//短信内容
        "phone": phone,//手机号码
        "sendtime": "",//定时时间 定时发送短信时间。格式为yyyyMMddHHmm，值小于或等于当前时间则立即发送，默认立即发送
        "report": "true",//是否需要状态报告（默认false）
        "extend": "555",//下发短信号码扩展码，纯数字，建议1-3位，选填
        "uid": uid,//该条短信在您业务系统内的ID，如产品号或者短信发送记录流水号，选填
        "format": "json",//请求相应格式json或者xml或者txt，选填
        "useragent": "http"//来源(cmpp,web,http)，默认http，选填
    }
    var headers = { 'content-type': "application/json" }
    var key = utils.randomKey();
    var rsaBody = {
        "account": account,
        "data": aes.encrypt(JSON.stringify(body), key),
        "key": rsaEncrypt(publicKey, key)
    }
    // 加密提交 
    utils.post(url + "/rsa", rsaBody, headers);
    // 普通提交 
    //utils.post(url, body, headers);
}

//变量短信
function msgVariable(account, password, params, msg, uid) {
    var url = 'http://10.10.50.3:8082/msg/variable/json'
    var body = {
        "account": account,//账号
        "password": password,//密码
        "msg": msg,//短信内容
        "params": params,//手机号码和变量参数，多组参数使用英文分号;区分，必填
        "sendtime": "",//定时时间 定时发送短信时间。格式为yyyyMMddHHmm，值小于或等于当前时间则立即发送，默认立即发送
        "report": "true",//是否需要状态报告（默认false）
        "extend": "555",//下发短信号码扩展码，纯数字，建议1-3位，选填
        "uid": uid,//该条短信在您业务系统内的ID，如产品号或者短信发送记录流水号，选填
        "format": "json",//请求相应格式json或者xml或者txt，选填
        "useragent": "http"//来源(cmpp,web,http)，默认http，选填
    }
    var headers = { 'content-type': "application/json" }
    var key = utils.randomKey();
    var rsaBody = {
        "account": account,
        "data": aes.encrypt(JSON.stringify(body), key),
        "key": rsaEncrypt(publicKey, key)
    }
    // 加密提交 
    utils.post(url + "/rsa", rsaBody, headers);
    // 普通提交 
    //utils.post(url, body, headers);
}

//短信包发送
function msgPackage(account, password, msg, uid) {
    var url = 'http://10.10.50.3:8082/msg/sendpackage/json'
    var body = `account=${account}&password=${password}&${msg}&sendtime=201908080000&report=true&extend=555&uid=${uid}&format=json&useragent=http`
    var headers = { 'content-type': "application/x-www-form-urlencoded" }
    var key = utils.randomKey();
    var rsaBody = {
        "account": account,
        "data": aes.encrypt(body, key),
        "key": rsaEncrypt(publicKey, key)
    }
    // 加密提交 
    //utils.post(url + "/rsa", rsaBody, headers, true);
        // 普通提交 
    utils.post(url, body, headers, true);
}

//余额查询
function queryBalance(account, password, uid) {
    var url = 'http://10.10.50.3:8082/msg/balance/json'
    var body = {
        "account": account,//账号
        "password": password,//密码
        "uid": uid,//该条短信在您业务系统内的ID，如产品号或者短信发送记录流水号，选填
        "format": "json"//请求相应格式json或者xml或者txt，选填
    }
    var headers = { 'content-type': "application/json" }
    var key = utils.randomKey();
    var rsaBody = {
        "account": account,
        "data": aes.encrypt(JSON.stringify(body), key),
        "key": rsaEncrypt(publicKey, key)
    }
    // 加密提交 
    utils.post(url + "/rsa", rsaBody, headers);
    // 普通提交 
    //utils.post(url, body, headers);
}

module.exports = {
    msgSend: msgSend,
    msgVariable: msgVariable,
    msgPackage: msgPackage,
    queryBalance: queryBalance
};