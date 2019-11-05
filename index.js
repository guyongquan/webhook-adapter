var express = require("express");
var fetch = require("node-fetch");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
    fetch("https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=ea553fed-117e-4305-a190-443f929c9253",
        {
            method: "POST",
            body: JSON.stringify({
                msgtype: "text",
                text: {
                    content: req.body.alerts[0].annotations.summary
                }
            }),

        }).then(function (res) {
            return res.text();
        }).then(
            function (text) {
                console.log(text);
            }
        ).finally(
            function () {
                res.send("ok");
            }
        );

})
app.listen(8080);