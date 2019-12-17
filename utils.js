'use strict';
var request = require("request");

//获取随机数
function randomKey() {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var nums = "";
    for (var i = 0; i < 16; i++) {
        var id = parseInt(Math.random() * chars.length);
        nums += chars[id];
    }
    return nums;
}

//提交短信
function post(url, data, header, isForm = false) {
    var options = {
        url: url,
        headers: header,
        method: "POST",
        json: true,
        body: data
    };
    if (isForm) {
        options.form = data;
    } else {
        options.body = data;
    }
    request.post(options, function (error, response, body) {
        //你的逻辑代码
        console.log("statusCode:" + response.statusCode)
        console.log('body: ' + JSON.stringify(body));
    });
}

module.exports = {
    randomKey: randomKey,
    post: post,
};