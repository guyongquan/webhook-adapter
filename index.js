var express = require("express");
var fetch = require("node-fetch");
var bodyParser = require('body-parser');
var argv = process.argv.slice(2);
var port = 8080;
const PORT_FLAG = "--port=";
const ADAPTER_FLAG = "--adapter=";
var settings = [];
argv.forEach(arg => {
    if (arg.startsWith(PORT_FLAG)) {
        port = parseInt(arg.substr(PORT_FLAG.length));
        return;
    }
    if (arg.startsWith(ADAPTER_FLAG)) {
        var noflag = arg.substr(ADAPTER_FLAG.length)
        var index1 = noflag.indexOf('=');
        var index2 = noflag.indexOf('=', index1 + 1)
        var js = require(noflag.substring(0, index1));
        settings.push(
            {
                from: noflag.substring(index1 + 1, index2),
                to: noflag.substring(index2 + 1),
                template: js.template,
                signUrl: js.signUrl || (url => url)
            }
        );
    }
});
var app = express();
app.use(bodyParser.json());
settings.forEach(
    function (e) {
        var pattern = new RegExp(e.from);
        app.use(
            function (req, res, next) {
                if (!pattern.test(req.url)) {
                    return next();
                }
                fetch(e.signUrl(e.to),
                    {
                        method: "POST",
                        body: JSON.stringify(e.template(req.body)),
                        headers: {
                            'Content-Type': "application/json"
                        }

                    }).then(
                        res => res.text()
                    ).then(
                        text => console.debug(text)
                    ).catch(
                        error => console.warn(error)
                    ).finally(
                        () => res.send("ok")
                    );
            }
        )
    }
)
app.listen(port);