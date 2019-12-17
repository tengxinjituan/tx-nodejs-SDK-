/**
 * 本实例需要request,node-rsa两个模块
 * 安装方法
 * 1、
 * npm install node-rsa
 * 2、
 * npm i request
 */

'use strict';
const send = require('./msgSend');
const NodeRSA = require('node-rsa');

var account = "lijie02" //账号
var password = "lijie02_lijie02" //密码
var phone = "18703807701" //手机号码
var msg = "您的验证码：2048【世界和平】" //短信内容
var uid = "1000102" //产品Id

//发送普通短信
send.msgSend(account, password, phone, msg, uid);

//发送变量
//var params = "18703807701,1122;18703807703,3333;" //手机号码
//msg = "您的验证码：{$var}【世界和平】" //短信内容
//send.msgVariable(account, password, params, msg, uid);

//短信包短信
//msg = "msg=18703807701|您的短信包短信验证码：11111【世界和平】&msg=18703807702|您的短信包短信验证码：2222【世界和平】" //短信内容
//send.msgPackage(account, password, msg, uid)

//余额查询
//send.queryBalance(account, password, uid)